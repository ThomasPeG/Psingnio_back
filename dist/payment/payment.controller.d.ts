import { PaymentService } from './payment.service';
import { CreateIntentDto } from './dto/create-intent.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createIntent(dto: CreateIntentDto): Promise<{
        clientSecret: string;
        paypalLink: string;
    }>;
    webhook(body: {
        attemptId?: string;
    }): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
}
