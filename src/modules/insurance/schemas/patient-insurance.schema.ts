import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PatientInsuranceDocument = PatientInsurance & Document;

@Schema({ timestamps: true })
export class PatientInsurance {
  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Provider', required: true })
  providerId: Types.ObjectId;

  @Prop({ required: true })
  policyNumber: string;

  @Prop()
  validTill?: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const PatientInsuranceSchema = SchemaFactory.createForClass(PatientInsurance);
