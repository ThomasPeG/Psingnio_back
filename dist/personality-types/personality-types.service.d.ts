import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { PersonalityType, PersonalityTypeDocument } from './schemas/personality-type.schema';
export declare class PersonalityTypesService implements OnModuleInit {
    private personalityTypeModel;
    constructor(personalityTypeModel: Model<PersonalityTypeDocument>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<PersonalityType[]>;
    findOne(id: number): Promise<PersonalityType>;
}
