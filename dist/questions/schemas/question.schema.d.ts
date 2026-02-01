import { Document } from 'mongoose';
export type QuestionDocument = Question & Document;
export declare class QuestionOption {
    value: number;
    label: string;
}
export declare class Question {
    id: number;
    text: string;
    options: QuestionOption[];
    domain: string;
}
export declare const QuestionSchema: import("mongoose").Schema<Question, import("mongoose").Model<Question, any, any, any, Document<unknown, any, Question, any, import("mongoose").DefaultSchemaOptions> & Question & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, Question>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Question, Document<unknown, {}, Question, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Question & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<number, Question, Document<unknown, {}, Question, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Question & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    text?: import("mongoose").SchemaDefinitionProperty<string, Question, Document<unknown, {}, Question, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Question & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    options?: import("mongoose").SchemaDefinitionProperty<QuestionOption[], Question, Document<unknown, {}, Question, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Question & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    domain?: import("mongoose").SchemaDefinitionProperty<string, Question, Document<unknown, {}, Question, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Question & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, Question>;
