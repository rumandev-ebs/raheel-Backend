import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '../enums/gender.enum';
import { BloodGroup } from '../enums/blood-group.enum';

export class CreatePatientDto {

  @ApiProperty({ example: '64cfa0e6f8b9a3a2a9c1d111' })
  @IsMongoId()
  userId: string;

  @ApiProperty({ example: 'Ali Khan' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: '1995-08-15' })
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiPropertyOptional({ enum: BloodGroup })
  @IsOptional()
  @IsEnum(BloodGroup)
  bloodGroup?: BloodGroup;

  @ApiPropertyOptional({ example: '03001234567' })
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'Lahore, Pakistan' })
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: '35202-1234567-1' })
  @IsOptional()
  cnic?: string;

  @ApiPropertyOptional({ example: 'Ahmed Khan' })
  @IsOptional()
  emergencyContactName?: string;

  @ApiPropertyOptional({ example: '03009876543' })
  @IsOptional()
  emergencyContactPhone?: string;
}
