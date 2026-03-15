import {
  Controller,
  Post,
  Body,
  Headers,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './payment.service';
import { CreateIntentDto } from './dto/create-intent.dto';

@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-intent')
  async createIntent(@Body() dto: CreateIntentDto) {
    return this.paymentService.createIntent(dto.attemptId);
  }

  @Post('create-premium-intent')
  async createPremiumIntent(@Body('userId') userId: string) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }
    return this.paymentService.createPremiumIntent(userId);
  }

  @Post('webhook')
  async webhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: Request,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    // NestJS default body parser parses JSON.
    // For Stripe webhooks, we need the raw buffer.
    // We assume that the RawBodyMiddleware (to be implemented) attaches 'rawBody' to the request.
    const rawBody = (request as any).rawBody;

    if (!rawBody) {
      throw new BadRequestException(
        'Raw body not available. Ensure middleware is configured.',
      );
    }

    return this.paymentService.handleWebhook(signature, rawBody);
  }

  @Post('sync')
  async syncPayment(@Body('paymentIntentId') paymentIntentId: string) {
    if (!paymentIntentId) {
      throw new BadRequestException('paymentIntentId is required');
    }
    return this.paymentService.syncPayment(paymentIntentId);
  }
}
