import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClaimStatus } from '../enums/claim-status.enum';

export class UpdateClaimDto {

  @ApiProperty({ enum: ClaimStatus, example: ClaimStatus.APPROVED })
  @IsEnum(ClaimStatus)
  status: ClaimStatus;

  @ApiPropertyOptional({ example: 'Claim verified and approved by insurance team.' })
  @IsOptional()
  @IsString()
  remarks?: string;
}
