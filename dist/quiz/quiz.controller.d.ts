import type { Request } from 'express';
import { QuizService } from './quiz.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    submit(dto: SubmitQuizDto, req: Request): Promise<{
        attemptId: string;
        preview: {
            typeName: string;
            snippet: string;
            blurData: string;
        };
    }>;
    getHistory(req: Request & {
        user: {
            sub: string;
        };
    }): Promise<{
        _id: string;
        date: any;
        score: number;
        resultTypeId: string;
        resultTypeName: string;
        imageUrl: string;
        snippet: string;
    }[]>;
    getResult(attemptId: string): Promise<{
        is_paid: boolean;
        result: {
            dominant: import("../personality-types/schemas/personality-type.schema").PersonalityType;
            secondary: import("../personality-types/schemas/personality-type.schema").PersonalityType;
            shadow: import("../personality-types/schemas/personality-type.schema").PersonalityType;
            work: import("../personality-types/schemas/personality-type.schema").PersonalityType;
            social: import("../personality-types/schemas/personality-type.schema").PersonalityType;
            money: import("../personality-types/schemas/personality-type.schema").PersonalityType;
        };
        preview?: undefined;
    } | {
        is_paid: boolean;
        preview: {
            typeName: string;
            snippet: string;
        };
        result?: undefined;
    }>;
}
