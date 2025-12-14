import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { OrderStatus } from './enums/order-status.enum';
import { Test, TestDocument } from '../tests/schemas/test.schema';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,

    @InjectModel(Test.name)
    private testModel: Model<TestDocument>,
  ) {}

  async create(dto: CreateOrderDto) {
    const tests = await this.testModel.find({
      _id: { $in: dto.testIds },
      isActive: true,
      isDeleted: false,
    });

    if (tests.length !== dto.testIds.length)
      throw new BadRequestException('Invalid test selection');

    const totalAmount = tests.reduce(
      (sum, t) => sum + t.price,
      0,
    );

    return this.orderModel.create({
      patientId: new Types.ObjectId(dto.patientId),
      doctorId: dto.doctorId
        ? new Types.ObjectId(dto.doctorId)
        : undefined,
      labId: new Types.ObjectId(dto.labId),
      tests: dto.testIds.map(id => new Types.ObjectId(id)),
      totalAmount,
      status: OrderStatus.CREATED,
      notes: dto.notes,
    });
  }

  async findAll(filter = {}) {
    return this.orderModel
      .find({ isDeleted: false, ...filter })
      .populate('patientId', 'name')
      .populate('doctorId', 'name')
      .populate('tests', 'name price')
      .populate('labId', 'name');
  }

  async findById(id: string) {
    const order = await this.orderModel
      .findOne({ _id: id, isDeleted: false })
      .populate('patientId')
      .populate('doctorId')
      .populate('tests')
      .populate('labId');

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      {
        status,
        isPaid: status === OrderStatus.PAID,
      },
      { new: true },
    );

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async cancel(id: string) {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      {
        status: OrderStatus.CANCELLED,
        isDeleted: true,
      },
      { new: true },
    );

    if (!order) throw new NotFoundException('Order not found');
    return { message: 'Order cancelled successfully' };
  }
}
