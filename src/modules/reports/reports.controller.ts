import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';

import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { AddResultDto } from './dtos/add-result.dto';
import { VerifyReportDto } from './dtos/verify-report.dto';

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @Roles(UserRole.LAB_ADMIN)
  create(@Body() dto: CreateReportDto) {
    return this.reportsService.create(dto);
  }

  @Patch(':id/result')
  @Roles(UserRole.TECHNICIAN)
  addResult(
    @Param('id') id: string,
    @Body() dto: AddResultDto,
  ) {
    return this.reportsService.addResult(id, dto);
  }

  @Patch(':id/verify')
  @Roles(UserRole.PATHOLOGIST)
  verify(
    @Param('id') id: string,
    @Body() dto: VerifyReportDto,
    @Req() req: any,
  ) {
    return this.reportsService.verify(
      id,
      dto,
      req.user.userId,
    );
  }

  @Patch(':id/release')
  @Roles(UserRole.LAB_ADMIN)
  release(@Param('id') id: string) {
    return this.reportsService.release(id);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.reportsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findById(id);
  }
}
