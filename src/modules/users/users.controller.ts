import {
  Controller,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // apply to all routes in this controller
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

  // only admin & superadmin can access
  @Get()
  @Roles('admin', 'superadmin')
  async findAll() {
    const users = await this.usersService.findAll();
    return { success: true, data: users };
  }
}
