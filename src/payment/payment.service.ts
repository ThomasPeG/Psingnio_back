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
      // Add other event handlers as needed (e.g., payment_intent.payment_failed)
      default:
        this.logger.log(`Unhandled event type ${event.type}`);
    }

    return { received: true };
  }

  private async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
    const { attemptId, userId } = paymentIntent.metadata;

    this.logger.log(`Payment succeeded for attempt ${attemptId} (User: ${userId})`);

    if (attemptId) {
      await this.quizService.markAsPaid(attemptId, paymentIntent.id);
    }

    if (userId && userId !== 'guest') {
       // Optional: Mark user as premium if that's the business model
       // Or simply rely on the attempt being paid
       // await this.usersService.markPremium(userId);
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
