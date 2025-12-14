import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ActionType } from '../enums/action-type.enum';

export type AuditLogDocument = AuditLog & Document;

@Schema({ timestamps: true })
export class AuditLog {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ enum: ActionType, required: true })
  actionType: ActionType;

  @Prop()
  entity: string; // e.g., "Order", "Sample", "Invoice"

  @Prop()
  entityId?: string; // objectId or identifier of affected entity

  @Prop()
  details?: string; // optional JSON string or description

  @Prop()
  ipAddress?: string; // for audit trails

  @Prop()
  userAgent?: string; // browser/device info
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
