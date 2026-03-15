import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalityTypesController } from './personality-types.controller';
import { PersonalityTypesService } from './personality-types.service';
import {
  PersonalityType,
  PersonalityTypeSchema,
} from './schemas/personality-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PersonalityType.name, schema: PersonalityTypeSchema },
    ]),
  ],
  controllers: [PersonalityTypesController],
  providers: [PersonalityTypesService],
  exports: [PersonalityTypesService],
})
export class PersonalityTypesModule {}
