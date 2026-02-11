import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompatibilityDocument = Compatibility & Document;

@Schema()
export class Compatibility {
  @Prop({ type: [String], required: true, index: true })
  arquetipos: string[]; // Stores IDs like ["T1", "T2"]

  @Prop({ type: [String] })
  atraccion: string[];

  @Prop({ type: [String] })
  luz: string[];

  @Prop({ type: [String] })
  sombra: string[];

  @Prop({ type: [String] })
  conflicto: string[];

  @Prop({ type: String })
  clave: string;
}

export const CompatibilitySchema = SchemaFactory.createForClass(Compatibility);
