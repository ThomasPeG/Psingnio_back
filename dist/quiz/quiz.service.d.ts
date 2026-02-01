import { Model, Types } from 'mongoose';
import { QuizAttempt, QuizAttemptDocument } from './schemas/quiz-attempt.schema';
import { PersonalityTypesService } from '../personality-types/personality-types.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { JwtService } from '@nestjs/jwt';
export declare class QuizService {
    private quizAttemptModel;
    private readonly personalityTypesService;
    private readonly jwtService;
    constructor(quizAttemptModel: Model<QuizAttemptDocument>, personalityTypesService: PersonalityTypesService, jwtService: JwtService);
    submit(dto: SubmitQuizDto, authHeader?: string): Promise<{
        attemptId: string;
        preview: {
            typeName: string;
            snippet: string;
            blurData: string;
        };
    }>;
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
    markAsPaid(attemptId: string, paymentId: string): Promise<(import("mongoose").Document<unknown, {}, QuizAttemptDocument, {}, import("mongoose").DefaultSchemaOptions> & QuizAttempt & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    findOne(attemptId: string): Promise<(import("mongoose").Document<unknown, {}, QuizAttemptDocument, {}, import("mongoose").DefaultSchemaOptions> & QuizAttempt & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getAttemptsByUserId(userId: string): Promise<(import("mongoose").Document<unknown, {}, QuizAttemptDocument, {}, import("mongoose").DefaultSchemaOptions> & QuizAttempt & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getUserHistory(userId: string): Promise<{
        _id: string;
        date: any;
        score: number;
        resultTypeId: string;
        resultTypeName: string;
        imageUrl: string;
        snippet: string;
    }[]>;
    private calculateResults;
}
