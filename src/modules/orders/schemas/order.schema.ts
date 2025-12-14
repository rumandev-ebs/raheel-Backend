import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderStatus } from '../enums/order-status.enum';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  doctorId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Lab', required: true })
  labId: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'Test', required: true }])
  tests: Types.ObjectId[];

  @Prop({ enum: OrderStatus, default: OrderStatus.CREATED })
  status: OrderStatus;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: false })
  isPaid: boolean;

  @Prop()
  notes?: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
