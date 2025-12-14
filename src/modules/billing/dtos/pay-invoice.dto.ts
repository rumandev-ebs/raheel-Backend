import { IsEnum, IsNumber } from 'class-validator';
import { PaymentMethod } from '../enums/payment-method.enum';

export class PayInvoiceDto {
  @IsNumber()
  amount: number;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;
}
