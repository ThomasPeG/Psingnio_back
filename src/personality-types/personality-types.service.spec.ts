import { Test, TestingModule } from '@nestjs/testing';
import { PersonalityTypesService } from './personality-types.service';

describe('PersonalityTypesService', () => {
  let service: PersonalityTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalityTypesService],
    }).compile();

    service = module.get<PersonalityTypesService>(PersonalityTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
