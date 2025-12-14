import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Invoice,
  InvoiceDocument,
} from './schemas/invoice.schema';
import {
  Payment,
  PaymentDocument,
} from './schemas/payment.schema';
import { InvoiceStatus } from './enums/invoice-status.enum';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { PayInvoiceDto } from './dtos/pay-invoice.dto';


@Injectable()
export class BillingService {
  constructor(
    @InjectModel(Invoice.name)
    private invoiceModel: Model<InvoiceDocument>,

    @InjectModel(Payment.name)
    private paymentModel: Model<PaymentDocument>,
  ) {}

  // CREATE INVOICE
  async createInvoice(dto: CreateInvoiceDto) {
    return this.invoiceModel.create({
      orderId: new Types.ObjectId(dto.orderId),
      patientId: new Types.ObjectId(dto.patientId),
      totalAmount: dto.totalAmount,
    });
  }

  // PAY INVOICE
  async payInvoice(
    invoiceId: string,
    dto: PayInvoiceDto,
    userId: string,
  ) {
    const invoice = await this.invoiceModel.findById(
      invoiceId,
    );

    if (!invoice)
      throw new NotFoundException('Invoice not found');

    const newPaidAmount =
      invoice.paidAmount + dto.amount;

    if (newPaidAmount > invoice.totalAmount)
      throw new BadRequestException(
        'Payment exceeds total amount',
      );

    invoice.paidAmount = newPaidAmount;

    invoice.status =
      newPaidAmount === invoice.totalAmount
        ? InvoiceStatus.PAID
        : InvoiceStatus.PARTIALLY_PAID;

    await invoice.save();

    await this.paymentModel.create({
      invoiceId: invoice._id,
      amount: dto.amount,
      method: dto.method,
      receivedBy: new Types.ObjectId(userId),
    });

    return invoice;
  }

  // GET ALL INVOICES
  async findAll(filter = {}) {
    return this.invoiceModel
      .find({ isDeleted: false, ...filter })
      .populate('patientId', 'name')
      .populate('orderId');
  }

  // GET SINGLE INVOICE
  async findById(id: string) {
    const invoice = await this.invoiceModel
      .findOne({ _id: id, isDeleted: false })
      .populate('patientId')
      .populate('orderId');

    if (!invoice)
      throw new NotFoundException('Invoice not found');

    return invoice;
  }
}
