import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Specialization } from '../enums/specialization.enum';

export class CreateDoctorDto {

  @ApiProperty({ example: '64cfa0e6f8b9a3a2a9c1d111' })
  @IsMongoId()
  userId: string;

  @ApiProperty({ example: 'Dr. Ahmed Khan' })
  @IsString()
  fullName: string;

  @ApiProperty({ enum: Specialization, example: Specialization.CARDIOLOGIST })
  @IsEnum(Specialization)
  specialization: Specialization;

  @ApiProperty({ example: 'PMC-123456' })
  @IsString()
  licenseNumber: string;

  @ApiPropertyOptional({ example: 'Shaukat Khanum Hospital' })
  @IsOptional()
  @IsString()
  hospitalName?: string;

  @ApiPropertyOptional({ example: '03001234567' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 15, description: 'Commission percentage' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  commissionPercentage?: number;
}
