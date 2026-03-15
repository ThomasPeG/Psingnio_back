import { Test, TestingModule } from '@nestjs/testing';
import { PersonalityTypesController } from './personality-types.controller';

describe('PersonalityTypesController', () => {
  let controller: PersonalityTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalityTypesController],
    }).compile();

    controller = module.get<PersonalityTypesController>(
      PersonalityTypesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
