import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Specialization } from '../enums/specialization.enum';

export type DoctorDocument = Doctor & Document;

@Schema({ timestamps: true })
export class Doctor {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  fullName: string;

  @Prop({ enum: Specialization, required: true })
  specialization: Specialization;

  @Prop({ required: true })
  licenseNumber: string;

  @Prop()
  hospitalName: string;

  @Prop()
  phone: string;

  @Prop({ default: 0 })
  commissionPercentage: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
