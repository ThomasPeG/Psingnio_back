import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './schemas/question.schema';
export declare class QuestionsService implements OnModuleInit {
    private questionModel;
    constructor(questionModel: Model<QuestionDocument>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<Question[]>;
}
