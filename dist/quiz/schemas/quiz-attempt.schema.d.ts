import { Document, Types } from 'mongoose';
export type QuizAttemptDocument = QuizAttempt & Document;
export declare class QuizAttempt {
    attemptId: string;
    user_answers: any;
    calculated_type_id: number;
    secondary_type_id: number;
    shadow_type_id: number;
    work_type_id: number;
    social_type_id: number;
    money_type_id: number;
    is_paid: boolean;
    payment_id: string;
    userId?: Types.ObjectId;
}
export declare const QuizAttemptSchema: import("mongoose").Schema<QuizAttempt, import("mongoose").Model<QuizAttempt, any, any, any, (Document<unknown, any, QuizAttempt, any, import("mongoose").DefaultSchemaOptions> & QuizAttempt & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, QuizAttempt, any, import("mongoose").DefaultSchemaOptions> & QuizAttempt & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, QuizAttempt>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, QuizAttempt, Document<unknown, {}, QuizAttempt, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    attemptId?: import("mongoose").SchemaDefinitionProperty<string, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    user_answers?: import("mongoose").SchemaDefinitionProperty<any, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    calculated_type_id?: import("mongoose").SchemaDefinitionProperty<number, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    secondary_type_id?: import("mongoose").SchemaDefinitionProperty<number, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    shadow_type_id?: import("mongoose").SchemaDefinitionProperty<number, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    work_type_id?: import("mongoose").SchemaDefinitionProperty<number, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    social_type_id?: import("mongoose").SchemaDefinitionProperty<number, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    money_type_id?: import("mongoose").SchemaDefinitionProperty<number, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    is_paid?: import("mongoose").SchemaDefinitionProperty<boolean, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    payment_id?: import("mongoose").SchemaDefinitionProperty<string, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, QuizAttempt, Document<unknown, {}, QuizAttempt, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<QuizAttempt & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, QuizAttempt>;
