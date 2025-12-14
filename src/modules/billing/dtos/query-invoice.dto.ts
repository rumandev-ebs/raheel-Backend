import { IsMongoId, IsOptional } from 'class-validator';

export class QueryInvoiceDto {
  @IsOptional()
  @IsMongoId()
  patientId?: string;

  @IsOptional()
  status?: string;
}
