import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class VerifyReportDto {

  @ApiPropertyOptional({ example: 'Checked and verified by lab supervisor' })
  @IsOptional()
  @IsString()
  remarks?: string;
}
