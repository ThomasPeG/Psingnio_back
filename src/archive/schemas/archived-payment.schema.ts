import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ArchivedPaymentDocument = ArchivedPayment & Document;

@Schema({ timestamps: { createdAt: 'archivedAt' } })
export class ArchivedPayment {
  @Prop({ required: true })
  paymentId: string; // Stripe Payment Intent ID

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  originalUserId: Types.ObjectId;
}

export const ArchivedPaymentSchema = SchemaFactory.createForClass(ArchivedPayment);
