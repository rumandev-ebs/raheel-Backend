import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ReportStatus } from '../enums/report-status.enum';
import { Result, ResultSchema } from './result.schema';

export type ReportDocument = Report & Document;

@Schema({ timestamps: true })
export class Report {
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  orderId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Test', required: true })
  testId: Types.ObjectId;

  @Prop({ type: [ResultSchema], default: [] })
  results: Result[];

  @Prop({ enum: ReportStatus, default: ReportStatus.DRAFT })
  status: ReportStatus;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  verifiedBy?: Types.ObjectId;

  @Prop()
  verifiedAt?: Date;

  @Prop()
  remarks?: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ReportSchema =
  SchemaFactory.createForClass(Report);
