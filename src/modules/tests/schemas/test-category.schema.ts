import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestCategoryDocument = TestCategory & Document;

@Schema({ timestamps: true })
export class TestCategory {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const TestCategorySchema =
  SchemaFactory.createForClass(TestCategory);
