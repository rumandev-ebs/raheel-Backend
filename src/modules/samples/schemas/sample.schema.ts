import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SampleStatus } from '../enums/sample-status.enum';

export type SampleDocument = Sample & Document;

@Schema({ timestamps: true })
export class Sample {
  @Prop({ required: true, unique: true })
  barcode: string;

  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  orderId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Test', required: true })
  testId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  technicianId?: Types.ObjectId;

  @Prop({ enum: SampleStatus, default: SampleStatus.CREATED })
  status: SampleStatus;

  @Prop()
  collectedAt?: Date;

  @Prop()
  receivedAt?: Date;

  @Prop()
  rejectedReason?: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const SampleSchema =
  SchemaFactory.createForClass(Sample);
