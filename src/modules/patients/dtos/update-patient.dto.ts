import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BloodGroup } from '../enums/blood-group.enum';

export class UpdatePatientDto {

  @ApiPropertyOptional({ example: 'Ali Khan' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ example: '03001234567' })
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'Islamabad, Pakistan' })
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ enum: BloodGroup })
  @IsOptional()
  @IsEnum(BloodGroup)
  bloodGroup?: BloodGroup;

  @ApiPropertyOptional({ example: 'Ahmed Khan' })
  @IsOptional()
  emergencyContactName?: string;

  @ApiPropertyOptional({ example: '03009876543' })
  @IsOptional()
  emergencyContactPhone?: string;
}
