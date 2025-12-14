import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { UserRole, UserRoleDocument } from './schemas/user-role.schema';
import { CreateRoleDto } from './dtos/create-role.dto';
import { AssignRoleDto } from './dtos/assign-role.dto';


@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(UserRole.name) private userRoleModel: Model<UserRoleDocument>,
  ) {}

  async createRole(dto: CreateRoleDto) {
    return this.roleModel.create(dto);
  }

  async listRoles() {
    return this.roleModel.find({ isActive: true });
  }

  async assignRole(dto: AssignRoleDto) {
    return this.userRoleModel.create({
      userId: new Types.ObjectId(dto.userId),
      roleId: new Types.ObjectId(dto.roleId),
    });
  }

  async getUserRoles(userId: string) {
    return this.userRoleModel.find({ userId })
      .populate('roleId');
  }

  async getRolePermissions(roleId: string) {
    const role = await this.roleModel.findById(roleId);
    if (!role) throw new NotFoundException('Role not found');
    return role.permissions;
  }
}
