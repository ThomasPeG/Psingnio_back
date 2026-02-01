import { UsersService } from './users.service';
import { QuizService } from '../quiz/quiz.service';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    private readonly quizService;
    constructor(usersService: UsersService, quizService: QuizService);
    profile(req: Request & {
        user: {
            sub: string;
        };
    }): Promise<{
        user: {
            _id: string;
            email: string;
            name: string;
            isPremium: boolean;
        };
        history: {
            _id: string;
            date: any;
            score: number;
            resultTypeId: string;
            resultTypeName: string;
            imageUrl: string;
            snippet: string;
        }[];
    }>;
}
