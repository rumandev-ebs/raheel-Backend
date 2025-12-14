import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSampleDto {

  @ApiProperty({ example: '64cfa0e6f8b9a3a2a9c1d111' })
  @IsMongoId()
  orderId: string;

  @ApiProperty({ example: '64cfa0e6f8b9a3a2a9c1d222' })
  @IsMongoId()
  patientId: string;

  @ApiProperty({ example: '64cfa0e6f8b9a3a2a9c1d333' })
  @IsMongoId()
  testId: string;
}
