import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProviderDto {

  @ApiProperty({ example: 'Alpha Insurance Co.' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'contact@alphainsurance.com, 03001234567' })
  @IsOptional()
  @IsString()
  contactInfo?: string;

  @ApiPropertyOptional({ example: '123 Main Street, Karachi, Pakistan' })
  @IsOptional()
  @IsString()
  address?: string;
}
