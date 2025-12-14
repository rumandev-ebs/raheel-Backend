import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLabDto {

  @ApiProperty({ example: 'HealthCare Diagnostic Lab' })
  @IsString()
  name: string;

  @ApiProperty({ example: '64cfa0e6f8b9a3a2a9c1d111' })
  @IsMongoId()
  ownerId: string;

  @ApiPropertyOptional({ example: 'contact@lab.com' })
  @IsOptional()
  @IsString()
  contactEmail?: string;

  @ApiPropertyOptional({ example: '03001234567' })
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @ApiPropertyOptional({ example: '123 Main Street, Lahore, Pakistan' })
  @IsOptional()
  @IsString()
  address?: string;
}
