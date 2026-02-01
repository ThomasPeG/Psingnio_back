import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateIntentDto } from './dto/create-intent.dto';

@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-intent')
  async createIntent(@Body() dto: CreateIntentDto) {
    return this.paymentService.createIntent(dto.attemptId);
  }

  @Post('webhook')
  async webhook(@Body() body: { attemptId?: string }) {
    return this.paymentService.handleWebhook(body);
  }
}
