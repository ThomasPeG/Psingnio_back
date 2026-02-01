import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class QuestionOption {
  @Prop()
  value: number;

  @Prop()
  label: string;
}

@Schema()
export class Question {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  text: string;

  @Prop([QuestionOption])
  options: QuestionOption[];

  @Prop({ required: true })
  domain: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
