import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Channel } from '../enums/channel.enum';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  senderId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Patient' })
  recipientId?: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({ enum: Channel, required: true })
  channel: Channel;

  @Prop({ default: false })
  isSent: boolean;

  @Prop()
  sentAt?: Date;

  @Prop()
  details?: string; // Optional metadata or response from provider
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
