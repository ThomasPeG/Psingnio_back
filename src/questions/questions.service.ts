import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './schemas/question.schema';
import { QUESTIONS_SEED } from './questions.seed';

@Injectable()
export class QuestionsService implements OnModuleInit {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.questionModel.countDocuments();
    if (count < 50) {
      console.log('Seeding/Updating Questions (Target 50)...');
      await this.questionModel.deleteMany({});
      await this.questionModel.insertMany(QUESTIONS_SEED);
      console.log('Questions Seeded/Updated');
      return;
    }
    const missingDomain = await this.questionModel.exists({ domain: { $exists: false } });
    if (missingDomain) {
      console.log('Reseeding Questions with Psignio format...');
      await this.questionModel.deleteMany({});
      await this.questionModel.insertMany(QUESTIONS_SEED);
      console.log('Questions Reseeded');
    }
  }

  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }
}
