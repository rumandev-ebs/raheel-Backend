import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SampleType } from '../enums/sample-type.enum';
import { TestUnit } from '../enums/test-unit.enum';

export class CreateTestDto {

  @ApiProperty({ example: '64cfa0e6f8b9a3a2a9c1d111' })
  @IsMongoId()
  categoryId: string;

  @ApiProperty({ example: 'Complete Blood Count' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'CBC-001' })
  @IsString()
  code: string;

  @ApiProperty({ enum: SampleType, example: SampleType.BLOOD })
  @IsEnum(SampleType)
  sampleType: SampleType;

  @ApiProperty({ example: 'Automated Hematology Analyzer' })
  @IsString()
  method: string;

  @ApiProperty({ enum: TestUnit, example: TestUnit.G_DL })
  @IsEnum(TestUnit)
  unit: TestUnit;

  @ApiProperty({ example: '13.5 – 17.5 g/dL' })
  @IsString()
  normalRangeMale: string;

  @ApiProperty({ example: '12.0 – 15.5 g/dL' })
  @IsString()
  normalRangeFemale: string;

  @ApiProperty({ example: 1200 })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({ example: 24, description: 'Turnaround time in hours' })
  @Type(() => Number)
  @IsNumber()
  tatHours: number;
}
