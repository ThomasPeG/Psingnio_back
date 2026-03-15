import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { QuizModule } from '../quiz/quiz.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [QuizModule, UsersModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
