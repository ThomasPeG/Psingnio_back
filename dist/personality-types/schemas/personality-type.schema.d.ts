import { Document } from 'mongoose';
export type PersonalityTypeDocument = PersonalityType & Document;
export declare class PersonalityType {
    id: number;
    name: string;
    description_preview: string;
    description_full: string;
    image_url: string;
    lightBullets: string[];
    shadowBullets: string[];
    pareja: string[];
    trabajo: {
        roles: string;
        ambiente: string;
        evita: string;
    };
    social: {
        vibra: string;
        limite: string;
    };
    dinero: {
        talento: string;
        riesgo: string;
        regla: string;
    };
    mantra: string;
}
export declare const PersonalityTypeSchema: import("mongoose").Schema<PersonalityType, import("mongoose").Model<PersonalityType, any, any, any, Document<unknown, any, PersonalityType, any, import("mongoose").DefaultSchemaOptions> & PersonalityType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, PersonalityType>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PersonalityType, Document<unknown, {}, PersonalityType, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & PersonalityType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<number, PersonalityType, Document<unknown, {}, PersonalityType, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & PersonalityType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, PersonalityType, Document<unknown, {}, PersonalityType, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & PersonalityType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    description_preview?: import("mongoose").SchemaDefinitionProperty<string, PersonalityType, Document<unknown, {}, PersonalityType, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & PersonalityType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    description_full?: import("mongoose").SchemaDefinitionProperty<string, PersonalityType, Document<unknown, {}, PersonalityType, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & PersonalityType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    image_url?: import("mongoose").SchemaDefinitionProperty<string, PersonalityType, Document<unknown, {}, PersonalityType, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & PersonalityType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    lightBullets?: import("mongoose").SchemaDefinitionProperty<string[], PersonalityType, Document<unknown, {}, PersonalityType, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & PersonalityType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    shadowBullets?: import("mongoose").SchemaDefinitionProperty<string[], PersonalityType, Document<unknown, {}, PersonalityType, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & PersonalityType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    pareja?: import("mongoose").SchemaDefinitionProperty<string[], PersonalityType, Document<unknown, {}, PersonalityType, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & PersonalityType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    trabajo?: import("mongoose").SchemaDefinitionProperty<{
        roles: string;
        ambiente: string;
        evita: string;
    }, PersonalityType, Document<unknown, {}, PersonalityType, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & PersonalityType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    social?: import("mongoose").SchemaDefinitionProperty<{
        vibra: string;
        limite: string;
    }, PersonalityType, Document<unknown, {}, PersonalityType, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & PersonalityType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    dinero?: import("mongoose").SchemaDefinitionProperty<{
        talento: string;
        riesgo: string;
        regla: string;
    }, PersonalityType, Document<unknown, {}, PersonalityType, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & PersonalityType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    mantra?: import("mongoose").SchemaDefinitionProperty<string, PersonalityType, Document<unknown, {}, PersonalityType, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & PersonalityType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, PersonalityType>;
