import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizService } from '../quiz/quiz.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly quizService: QuizService,
    private readonly usersService: UsersService,
  ) {}

  async createIntent(attemptId: string) {
    const attempt = await this.quizService.findOne(attemptId);
    if (!attempt) {
      throw new NotFoundException('Quiz attempt not found');
    }

    // Mock logic for Stripe/PayPal
    return {
      clientSecret: `mock_secret_${attemptId}_${Date.now()}`,
      paypalLink: `https://paypal.me/mock?ref=${attemptId}`,
    };
  }

  async handleWebhook(body: any) {
    // In a real app, verify signature here.
    // Body should contain reference to attemptId.
    // For this mock, we assume body has { attemptId: "..." }

    if (body.attemptId) {
      const attempt = await this.quizService.markAsPaid(
        body.attemptId,
        'mock_txn_' + Date.now(),
      );
      if (attempt?.userId) {
        await this.usersService.markPremium(String(attempt.userId));
      }
      return { success: true };
    }
    return { success: false, message: 'No attemptId in webhook body' };
  }
}
