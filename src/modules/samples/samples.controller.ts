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
import { SamplesService } from './samples.service';

import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UpdateSampleStatusDto } from './dtos/update-sample.dto';
import { CreateSampleDto } from './dtos/create-sample.dto';

@Controller('samples')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SamplesController {
  constructor(private readonly samplesService: SamplesService) {}

  @Post()
  @Roles(UserRole.LAB_ADMIN)
  create(@Body() dto: CreateSampleDto) {
    return this.samplesService.create(dto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.samplesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.samplesService.findById(id);
  }

  @Patch(':id/status')
  @Roles(UserRole.TECHNICIAN, UserRole.LAB_ADMIN)
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateSampleStatusDto,
    @Req() req: any,
  ) {
    return this.samplesService.updateStatus(
      id,
      dto,
      req.user?.userId,
    );
  }
}
