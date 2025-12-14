import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ClaimStatus } from '../enums/claim-status.enum';

export type ClaimDocument = Claim & Document;

@Schema({ timestamps: true })
export class Claim {
  @Prop({ type: Types.ObjectId, ref: 'PatientInsurance', required: true })
  patientInsuranceId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Invoice', required: true })
  invoiceId: Types.ObjectId;

  @Prop({ required: true })
  claimedAmount: number;

  @Prop({ enum: ClaimStatus, default: ClaimStatus.SUBMITTED })
  status: ClaimStatus;

  @Prop()
  remarks?: string;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
