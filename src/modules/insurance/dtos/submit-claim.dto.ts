import { IsMongoId, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SubmitClaimDto {

  @ApiProperty({ example: '64cfa0e6f8b9a3a2a9c1d333' })
  @IsMongoId()
  patientInsuranceId: string;

  @ApiProperty({ example: '64cfa0e6f8b9a3a2a9c1d444' })
  @IsMongoId()
  invoiceId: string;

  @ApiProperty({ example: 1500 })
  @Type(() => Number)
  @IsNumber()
  claimedAmount: number;
}
