import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SampleType } from '../enums/sample-type.enum';
import { TestUnit } from '../enums/test-unit.enum';

export type TestDocument = Test & Document;

@Schema({ timestamps: true })
export class Test {
  @Prop({ type: Types.ObjectId, ref: 'TestCategory', required: true })
  categoryId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string; // LOINC compatible later

  @Prop({ enum: SampleType, required: true })
  sampleType: SampleType;

  @Prop()
  method: string;

  @Prop()
  unit: TestUnit;

  @Prop()
  normalRangeMale: string;

  @Prop()
  normalRangeFemale: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  tatHours: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const TestSchema = SchemaFactory.createForClass(Test);
