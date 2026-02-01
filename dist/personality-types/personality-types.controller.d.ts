import { PersonalityTypesService } from './personality-types.service';
import { PersonalityType } from './schemas/personality-type.schema';
export declare class PersonalityTypesController {
    private readonly personalityTypesService;
    constructor(personalityTypesService: PersonalityTypesService);
    findAll(): Promise<PersonalityType[]>;
}
