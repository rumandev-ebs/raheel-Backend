import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ResultFlag } from '../enums/result-flag.enum';

@Schema({ _id: false })
export class Result {
  @Prop({ required: true })
  parameter: string;

  @Prop({ required: true })
  value: string;

  @Prop()
  unit?: string;

  @Prop()
  normalRange?: string;

  @Prop({
    enum: ResultFlag,
    default: ResultFlag.NORMAL,
  })
  flag: ResultFlag;
}

export const ResultSchema =
  SchemaFactory.createForClass(Result);
