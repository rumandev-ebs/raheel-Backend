import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  avatar: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop()
  otpCode?: string;

  @Prop()
  otpExpiry?: Date;

  @Prop()
  resetOtp?: string;

  @Prop()
  resetOtpExpiry?: Date;

  @Prop({
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user',
  })
  role: string;

  @Prop({ default: true })
  isActive: boolean;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
