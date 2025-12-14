import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {

  @ApiProperty({ example: '64cfa0e6f8b9a3a2a9c1d111' })
  @IsMongoId()
  patientId: string;

  @ApiProperty({ example: '64cfa0e6f8b9a3a2a9c1d222' })
  @IsMongoId()
  labId: string;

  @ApiPropertyOptional({ example: '64cfa0e6f8b9a3a2a9c1d333' })
  @IsOptional()
  @IsMongoId()
  doctorId?: string;

  @ApiProperty({
    example: [
      '64cfa0e6f8b9a3a2a9c1d444',
      '64cfa0e6f8b9a3a2a9c1d555',
    ],
    description: 'Array of test IDs'
  })
  @IsArray()
  @IsMongoId({ each: true })
  testIds: string[];

  @ApiPropertyOptional({
    example: 'Patient is diabetic. Perform tests carefully.'
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
