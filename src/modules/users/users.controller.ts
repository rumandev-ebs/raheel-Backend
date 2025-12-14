import { Controller, Get, UseGuards, Req, Query, Param, Patch, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUsersQueryDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
// @UseGuards(JwtAuthGuard, RolesGuard) // apply to all routes in this controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // any logged-in user can access (no @Roles)
  @Get('me')
  async getProfile(@Req() req) {
    return {
      success: true,
      data: req.user,
    };
  }

  // READ with pagination, search, filters
  @Get()
  @Roles('admin', 'superadmin')
  @ApiOperation({
    summary: 'Get list of users (paginated, searchable, filterable)',
  })
  @ApiResponse({ status: 200, description: 'List of users returned' })
  async getAllUsers(@Query() query: GetUsersQueryDto) {
    return this.usersService.getAllUsers(query);
  }

  // READ single
  @Get(':id')
  @ApiOperation({ summary: 'Get single user by id' })
  @ApiResponse({ status: 200, description: 'User returned' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  // SOFT DELETE
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete user by id' })
  @ApiResponse({ status: 200, description: 'User soft deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found or already deleted' })
  async softDelete(@Param('id') id: string) {
    return this.usersService.softDelete(id);
  }

  // RESTORE
  @Patch('/restore/:id')
  @ApiOperation({ summary: 'Restore a soft-deleted user by id' })
  @ApiResponse({ status: 200, description: 'User restored successfully' })
  @ApiResponse({ status: 404, description: 'User not found or not deleted' })
  async restore(@Param('id') id: string) {
    return this.usersService.restore(id);
  }
}
