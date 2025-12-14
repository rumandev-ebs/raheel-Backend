import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BranchDocument = Branch & Document;

@Schema({ timestamps: true })
export class Branch {
  @Prop({ type: Types.ObjectId, ref: 'Lab', required: true })
  labId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop()
  openingTime: string;

  @Prop()
  closingTime: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
