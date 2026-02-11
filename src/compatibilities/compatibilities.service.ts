import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Compatibility,
  CompatibilityDocument,
} from './schemas/compatibility.schema';
// import * as fs from 'fs';
// import * as path from 'path';

@Injectable()
export class CompatibilitiesService implements OnModuleInit {
  private readonly logger = new Logger(CompatibilitiesService.name);

  constructor(
    @InjectModel(Compatibility.name)
    private compatibilityModel: Model<CompatibilityDocument>,
  ) {}

  async onModuleInit() {
    // await this.seedCompatibilities();
  }

  /*
  private async seedCompatibilities() {
    const count = await this.compatibilityModel.countDocuments();
    if (count > 0) {
      this.logger.log('Compatibilities already seeded');
      return;
    }

    this.logger.log('Seeding compatibilities...');

    try {
      const filePath = path.join(process.cwd(), 'compatibilities.json');
      if (!fs.existsSync(filePath)) {
        this.logger.error(`File not found: ${filePath}`);
        return;
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const data: any[] = JSON.parse(fileContent);

      const nameToId: Record<string, string> = {
        'el impulso': 'T1',
        'el vinculo': 'T2',
        'el estratega': 'T3',
        'el soberano': 'T4',
        'el visionario': 'T5',
        'el arquitecto': 'T6',
        'el alquimista': 'T7',
      };

      const compatibilitiesToInsert = data.map((item: any) => {
        const mappedArchetypes = (item.arquetipos as string[]).map((name: string) => {
          const id = nameToId[name.toLowerCase()];
          if (!id) {
            this.logger.warn(
              `Unknown archetype name in compatibility seed: ${name}`,
            );
            return name;
          }
          return id;
        });

        return {
          ...item,
          arquetipos: mappedArchetypes,
        };
      });

      await this.compatibilityModel.insertMany(compatibilitiesToInsert);
      this.logger.log(
        `Seeded ${compatibilitiesToInsert.length} compatibility entries`,
      );
    } catch (error) {
      this.logger.error('Error seeding compatibilities', error);
    }
  }
  */

  async findByArchetype(archetypeId: string): Promise<Compatibility[]> {
    const idToName: Record<string, string> = {
      'T1': 'el impulso',
      'T2': 'el vinculo',
      'T3': 'el estratega',
      'T4': 'el soberano',
      'T5': 'el visionario',
      'T6': 'el arquitecto',
      'T7': 'el alquimista',
    };

    const name = idToName[archetypeId];
    if (!name) {
      this.logger.warn(`Invalid archetype ID requested: ${archetypeId}`);
      return [];
    }

    // console.log(`[DEBUG] Searching for archetype: "${archetypeId}" mapped to "${name}"`);
    // Find all compatibilities where the archetypes array contains the mapped name
    return this.compatibilityModel.find({ arquetipos: name }).exec();
  }
}
