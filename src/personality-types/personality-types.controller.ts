import { Controller, Get } from '@nestjs/common';
import { PersonalityTypesService } from './personality-types.service';
import { PersonalityType } from './schemas/personality-type.schema';

@Controller('api/personality-types')
export class PersonalityTypesController {
  constructor(
    private readonly personalityTypesService: PersonalityTypesService,
  ) {}

  @Get()
  async findAll(): Promise<PersonalityType[]> {
    return this.personalityTypesService.findAll();
  }
}
