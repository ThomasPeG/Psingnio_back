import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PersonalityType,
  PersonalityTypeDocument,
} from './schemas/personality-type.schema';
import { PERSONALITY_TYPES_SEED } from './personality-types.seed';

@Injectable()
export class PersonalityTypesService implements OnModuleInit {
  constructor(
    @InjectModel(PersonalityType.name)
    private personalityTypeModel: Model<PersonalityTypeDocument>,
  ) {}

  async onModuleInit() {
    // console.log('Syncing Personality Types Seed...');
    // for (const type of PERSONALITY_TYPES_SEED) {
    //   await this.personalityTypeModel.updateOne(
    //     { id: type.id },
    //     {
    //       $set: type,
    //       $unset: { image_url: 1 } // Remove legacy field
    //     },
    //     { upsert: true },
    //   );
    // }
    // console.log('Personality Types Synced');
    console.log('Personality Types Sync SKIPPED (Manual Mode)');
  }

  async findAll(): Promise<PersonalityType[]> {
    return this.personalityTypeModel.find().exec();
  }

  async findOne(id: number): Promise<PersonalityType> {
    const type = await this.personalityTypeModel.findOne({ id }).exec();
    if (!type) {
      throw new NotFoundException(`Personality Type with ID ${id} not found`);
    }
    return type;
  }
}
