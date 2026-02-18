import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import {
  QuizAttempt,
  QuizAttemptDocument,
} from '../quiz/schemas/quiz-attempt.schema';
import {
  ArchivedPayment,
  ArchivedPaymentDocument,
} from '../archive/schemas/archived-payment.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(QuizAttempt.name)
    private quizAttemptModel: Model<QuizAttemptDocument>,
    @InjectModel(ArchivedPayment.name)
    private archivedPaymentModel: Model<ArchivedPaymentDocument>,
  ) {}

  async createWithPassword(email: string, password: string, name?: string) {
    const existing = await this.userModel.findOne({ email }).exec();
    if (existing) throw new BadRequestException('Email ya registrado');
    const hash = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hash, name });
    await user.save();
    return user;
  }

  async validatePassword(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user || !user.password)
      throw new NotFoundException('Credenciales inválidas');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new NotFoundException('Credenciales inválidas');
    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async upsertGoogle(email: string, googleId: string, name?: string) {
    let user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      user = new this.userModel({ email, googleId, name });
      await user.save();
    } else {
      if (!user.googleId) {
        user.googleId = googleId;
        if (name && !user.name) user.name = name;
        await user.save();
      }
    }
    return user;
  }

  async markPremium(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException('Usuario no encontrado');
    user.isPremium = true;
    await user.save();
    return user;
  }

  async deleteUserAndData(userId: string): Promise<void> {
    console.log('userId', userId);
    const objectUserId = new Types.ObjectId(userId);

    // 1. Find all quiz attempts for the user
    const attempts = await this.quizAttemptModel.find({ userId: objectUserId });

    // 2. Filter for paid attempts and archive them
    const paidAttempts = attempts.filter(
      (attempt) => attempt.is_paid && attempt.payment_id,
    );

    if (paidAttempts.length > 0) {
      const archives = paidAttempts.map((attempt) => ({
        paymentId: attempt.payment_id,
        originalUserId: objectUserId,
      }));
      await this.archivedPaymentModel.insertMany(archives);
    }

    // 3. Delete all quiz attempts for the user (paid and unpaid)
    await this.quizAttemptModel.deleteMany({ userId: objectUserId });

    // 4. Delete the user
    const result = await this.userModel.deleteOne({ _id: objectUserId });

    if (result.deletedCount === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
