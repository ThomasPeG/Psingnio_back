import { QuizService } from '../quiz/quiz.service';
import { UsersService } from '../users/users.service';
export declare class PaymentService {
    private readonly quizService;
    private readonly usersService;
    constructor(quizService: QuizService, usersService: UsersService);
    createIntent(attemptId: string): Promise<{
        clientSecret: string;
        paypalLink: string;
    }>;
    handleWebhook(body: any): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
}
