import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PersonalityTypeDocument = PersonalityType & Document;

@Schema()
export class PersonalityType {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description_preview: string;

  @Prop({ required: true })
  description_full: string;

  @Prop({ required: true })
  image_url: string;

  @Prop({ type: [String], default: [] })
  lightBullets: string[];

  @Prop({ type: [String], default: [] })
  shadowBullets: string[];

  @Prop({ type: [String], default: [] })
  pareja: string[];

  @Prop({ type: Object })
  trabajo: {
    roles: string;
    ambiente: string;
    evita: string;
  };

  @Prop({ type: Object })
  social: {
    vibra: string;
    limite: string;
  };

  @Prop({ type: Object })
  dinero: {
    talento: string;
    riesgo: string;
    regla: string;
  };

  @Prop({ required: false })
  mantra: string;
}

export const PersonalityTypeSchema =
  SchemaFactory.createForClass(PersonalityType);
