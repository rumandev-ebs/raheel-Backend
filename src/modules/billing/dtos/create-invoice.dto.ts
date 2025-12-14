import { IsMongoId, IsNumber } from 'class-validator';

export class CreateInvoiceDto {
  @IsMongoId()
  orderId: string;

  @IsMongoId()
  patientId: string;

  @IsNumber()
  totalAmount: number;
}
