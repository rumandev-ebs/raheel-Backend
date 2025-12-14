import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { AssignRoleDto } from './dtos/assign-role.dto';


@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @Get()
  listRoles() {
    return this.rolesService.listRoles();
  }

  @Post('assign')
  assignRole(@Body() dto: AssignRoleDto) {
    return this.rolesService.assignRole(dto);
  }

  @Get('user/:id')
  getUserRoles(@Param('id') userId: string) {
    return this.rolesService.getUserRoles(userId);
  }
}
