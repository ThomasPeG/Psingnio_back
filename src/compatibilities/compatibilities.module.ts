import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompatibilitiesController } from './compatibilities.controller';
import { CompatibilitiesService } from './compatibilities.service';
import {
  Compatibility,
  CompatibilitySchema,
} from './schemas/compatibility.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Compatibility.name, schema: CompatibilitySchema },
    ]),
  ],
  controllers: [CompatibilitiesController],
  providers: [CompatibilitiesService],
  exports: [CompatibilitiesService],
})
export class CompatibilitiesModule {}
