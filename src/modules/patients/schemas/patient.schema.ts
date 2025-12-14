import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Gender } from '../enums/gender.enum';
import { BloodGroup } from '../enums/blood-group.enum';

export type PatientDocument = Patient & Document;

@Schema({ timestamps: true })
export class Patient {
  @Prop({ unique: true })
  mrn: string; // Medical Record Number

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ enum: Gender })
  gender: Gender;

  @Prop({ enum: BloodGroup })
  bloodGroup: BloodGroup;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  cnic: string;

  @Prop({ default: false })
  isDeleted: boolean;

  // Emergency Contact
  @Prop()
  emergencyContactName: string;

  @Prop()
  emergencyContactPhone: string;
}


export const PatientSchema = SchemaFactory.createForClass(Patient);
