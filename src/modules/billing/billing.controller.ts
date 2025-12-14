import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BillingService } from './billing.service';

import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { PayInvoiceDto } from './dtos/pay-invoice.dto';

@Controller('billing')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('invoice')
  @Roles(UserRole.RECEPTIONIST, UserRole.LAB_ADMIN)
  createInvoice(@Body() dto: CreateInvoiceDto) {
    return this.billingService.createInvoice(dto);
  }

  @Post('invoice/:id/pay')
  @Roles(UserRole.RECEPTIONIST, UserRole.LAB_ADMIN)
  payInvoice(
    @Param('id') id: string,
    @Body() dto: PayInvoiceDto,
    @Req() req: any,
  ) {
    return this.billingService.payInvoice(
      id,
      dto,
      req.user.userId,
    );
  }

  @Get('invoice')
  findAll(@Query() query: any) {
    return this.billingService.findAll(query);
  }

  @Get('invoice/:id')
  findOne(@Param('id') id: string) {
    return this.billingService.findById(id);
  }
}
