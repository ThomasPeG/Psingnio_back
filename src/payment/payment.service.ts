import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { QuizService } from '../quiz/quiz.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private readonly quizService: QuizService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!apiKey) {
      this.logger.error('STRIPE_SECRET_KEY is not defined in environment variables');
    }
    this.stripe = new Stripe(apiKey || '', {
      apiVersion: '2025-01-27.acacia', // Latest API version
    });
  }

  async createIntent(attemptId: string) {
    const attempt = await this.quizService.findOne(attemptId);
    if (!attempt) {
      throw new NotFoundException('Quiz attempt not found');
    }

    if (attempt.is_paid) {
      throw new BadRequestException('This attempt is already paid');
    }

    // Amount should be configured in env or database. 
    // Example: $9.99 = 999 cents
    const amount = this.configService.get<number>('STRIPE_PRICE_AMOUNT') || 999;
    const currency = this.configService.get<string>('STRIPE_CURRENCY') || 'usd';

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        metadata: {
          attemptId,
          userId: attempt.userId ? attempt.userId.toString() : 'guest',
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        clientSecret: paymentIntent.client_secret,
        publicKey: this.configService.get<string>('STRIPE_PUBLIC_KEY'),
      };
    } catch (error) {
      this.logger.error(`Error creating payment intent: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to create payment intent');
    }
  }

  async createPremiumIntent(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isPremium) {
      throw new BadRequestException('User is already premium');
    }

    // Amount for premium subscription/upgrade
    const amount =
      this.configService.get<number>('STRIPE_PREMIUM_PRICE_AMOUNT') || 2999;
    const currency = this.configService.get<string>('STRIPE_CURRENCY') || 'usd';

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        metadata: {
          userId: userId,
          type: 'premium_upgrade',
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        clientSecret: paymentIntent.client_secret,
        publicKey: this.configService.get<string>('STRIPE_PUBLIC_KEY'),
      };
    } catch (error) {
      this.logger.error(
        `Error creating premium payment intent: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Failed to create premium payment intent',
      );
    }
  }

  async handleWebhook(signature: string, rawBody: Buffer) {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      this.logger.error('STRIPE_WEBHOOK_SECRET is not defined');
      throw new InternalServerErrorException('Stripe configuration error');
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret,
      );
    } catch (err) {
      this.logger.error(`Webhook signature verification failed: ${err.message}`);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    // Handle specific event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await this.handlePaymentSuccess(paymentIntent);
        break;

      case 'payment_intent.payment_failed': {
        const intent = event.data.object as Stripe.PaymentIntent;
        const failureReason = intent.last_payment_error?.message || 'Unknown reason';
        this.logger.warn(
          `❌ Payment Failed: Attempt ${intent.metadata.attemptId} - Reason: ${failureReason}`,
        );
        break;
      }

      case 'payment_intent.processing': {
        const intent = event.data.object as Stripe.PaymentIntent;
        this.logger.log(
          `⏳ Payment Processing: Attempt ${intent.metadata.attemptId} is pending bank approval.`,
        );
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        const paymentIntentId = charge.payment_intent as string;
        this.logger.warn(
          `💸 Payment Refunded: PaymentIntent ${paymentIntentId}. Consider revoking access.`,
        );
        // TODO: Implement logic to revoke access (markAsUnpaid) if business logic requires it
        break;
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute;
        const paymentIntentId =
          typeof dispute.payment_intent === 'string'
            ? dispute.payment_intent
            : dispute.payment_intent?.id;
        this.logger.error(
          `🚨 DISPUTE CREATED! PaymentIntent: ${paymentIntentId}. Reason: ${dispute.reason}`,
        );
        // Critical: Alert admin or block user immediately
        break;
      }

      default:
        this.logger.log(`Unhandled event type ${event.type}`);
    }

    return { received: true };
  }

  private async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
    const { attemptId, userId, type } = paymentIntent.metadata;

    this.logger.log(`Payment succeeded for attempt ${attemptId} (User: ${userId})`);

    if (type === 'premium_upgrade' && userId) {
      await this.usersService.markPremium(userId);
      this.logger.log(`User ${userId} upgraded to PREMIUM.`);
    } else if (attemptId) {
      await this.quizService.markAsPaid(attemptId, paymentIntent.id);
    }

    // Legacy fallback: if no type but has attemptId (old intents)
    if (!type && attemptId) {
       await this.quizService.markAsPaid(attemptId, paymentIntent.id);
    }
  }

  async syncPayment(paymentIntentId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === 'succeeded') {
        await this.handlePaymentSuccess(paymentIntent);
        return { status: 'succeeded', paid: true };
      }
      
      return { status: paymentIntent.status, paid: false };
    } catch (error) {
      this.logger.error(`Error syncing payment ${paymentIntentId}: ${error.message}`);
      throw new BadRequestException('Could not verify payment status');
    }
  }
}
