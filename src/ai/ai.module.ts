import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { PersonalityTypesModule } from '../personality-types/personality-types.module';

@Module({
  imports: [PersonalityTypesModule], // Import module to access PersonalityTypesService
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
