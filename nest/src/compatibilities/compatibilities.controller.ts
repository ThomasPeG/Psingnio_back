import { Controller, Get, Param } from '@nestjs/common';
import { CompatibilitiesService } from './compatibilities.service';
import { Compatibility } from './schemas/compatibility.schema';

@Controller('api/compatibilities')
export class CompatibilitiesController {
  constructor(
    private readonly compatibilitiesService: CompatibilitiesService,
  ) {}

  @Get(':id')
  async getCompatibilities(@Param('id') id: string): Promise<Compatibility[]> {
    return this.compatibilitiesService.findByArchetype(id);
  }
}
