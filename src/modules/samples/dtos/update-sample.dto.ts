import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SampleStatus } from '../enums/sample-status.enum';

export class UpdateSampleStatusDto {

  @ApiProperty({ enum: SampleStatus, example: SampleStatus.COLLECTED })
  @IsEnum(SampleStatus)
  status: SampleStatus;

  @ApiPropertyOptional({
    example: 'Sample quantity insufficient'
  })
  @IsOptional()
  @IsString()
  rejectedReason?: string;
}
