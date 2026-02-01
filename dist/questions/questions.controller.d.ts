import { QuestionsService } from './questions.service';
import { Question } from './schemas/question.schema';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    findAll(): Promise<Question[]>;
}
