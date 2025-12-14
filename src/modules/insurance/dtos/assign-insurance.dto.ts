import { IsMongoId, IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AssignInsuranceDto {

  @ApiProperty({ example: '64cfa0e6f8b9a3a2a9c1d111' })
  @IsMongoId()
  patientId: string;

  @ApiProperty({ example: '64cfa0e6f8b9a3a2a9c1d222' })
  @IsMongoId()
  providerId: string;

  @ApiProperty({ example: 'POL-2025-001' })
  @IsString()
  policyNumber: string;

  @ApiPropertyOptional({ example: '2026-12-31' })
  @IsOptional()
  @IsDateString()
  validTill?: string;
}
