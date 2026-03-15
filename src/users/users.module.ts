import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { QuizModule } from '../quiz/quiz.module';
import {
  QuizAttempt,
  QuizAttemptSchema,
} from '../quiz/schemas/quiz-attempt.schema';
import {
  ArchivedPayment,
  ArchivedPaymentSchema,
} from '../archive/schemas/archived-payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: QuizAttempt.name, schema: QuizAttemptSchema },
      { name: ArchivedPayment.name, schema: ArchivedPaymentSchema },
    ]),
    forwardRef(() => QuizModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
