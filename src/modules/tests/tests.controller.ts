import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { CreateTestDto } from './dtos/create-test.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { QueryTestDto } from './dtos/query-test.dto';
import { UpdateTestDto } from './dtos/update-test.dto';

@Controller('tests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.LAB_ADMIN)
  create(@Body() dto: CreateTestDto) {
    return this.testsService.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryTestDto) {
    return this.testsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testsService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.LAB_ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateTestDto) {
    return this.testsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.testsService.softDelete(id);
  }
}
