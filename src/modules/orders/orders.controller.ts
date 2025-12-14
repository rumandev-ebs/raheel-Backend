import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { OrderStatus } from './enums/order-status.enum';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { OrderService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(UserRole.RECEPTIONIST, UserRole.LAB_ADMIN)
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  @Patch(':id/status/:status')
  @Roles(UserRole.LAB_ADMIN, UserRole.TECHNICIAN)
  updateStatus(
    @Param('id') id: string,
    @Param('status') status: OrderStatus,
  ) {
    return this.orderService.updateStatus(id, status);
  }
}
