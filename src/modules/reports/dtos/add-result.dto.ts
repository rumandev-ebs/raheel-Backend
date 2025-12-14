import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResultFlag } from '../enums/result-flag.enum';

export class AddResultDto {

  @ApiProperty({ example: 'Hemoglobin' })
  @IsString()
  parameter: string;

  @ApiProperty({ example: '14.2' })
  @IsString()
  value: string;

  @ApiPropertyOptional({ example: 'g/dL' })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({ example: '13.5 – 17.5 g/dL' })
  @IsOptional()
  @IsString()
  normalRange?: string;

  @ApiProperty({ enum: ResultFlag, example: ResultFlag.NORMAL })
  @IsEnum(ResultFlag)
  flag: ResultFlag;
}
