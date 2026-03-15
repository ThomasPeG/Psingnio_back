import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PersonalityType,
  PersonalityTypeDocument,
} from './schemas/personality-type.schema';

@Injectable()
export class PersonalityTypesService implements OnModuleInit {
  constructor(
    @InjectModel(PersonalityType.name)
    private personalityTypeModel: Model<PersonalityTypeDocument>,
  ) {}

  onModuleInit() {
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
