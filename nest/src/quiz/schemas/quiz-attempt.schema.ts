import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as uuid from 'uuid';

export type QuizAttemptDocument = QuizAttempt & Document;

@Schema({ timestamps: true })
export class QuizAttempt {
  @Prop({ default: uuid.v4, unique: true })
  attemptId: string;

  @Prop({ type: Object })
  user_answers: any; // JSON with answers

  @Prop()
  calculated_type_id: number; // Dominant

  @Prop()
  secondary_type_id: number;

  @Prop()
  shadow_type_id: number;

  @Prop()
  work_type_id: number;

  @Prop()
  social_type_id: number;

  @Prop()
  money_type_id: number;

  @Prop({ default: false })
  is_paid: boolean;

  @Prop()
  payment_id: string;

  @Prop()
  linked_match_id: string; // ID of the partner's attempt (if referred)

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId?: Types.ObjectId;
}

export const QuizAttemptSchema = SchemaFactory.createForClass(QuizAttempt);
