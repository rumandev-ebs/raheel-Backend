import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Permission } from '../enums/permission.enum';

export class CreateRoleDto {

  @ApiProperty({ example: 'Lab Technician', description: 'Name of the role' })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    enum: Permission,
    isArray: true,
     example: [Permission.MANAGE_PATIENTS, Permission.MANAGE_ORDERS],
    description: 'Array of permissions assigned to this role'
  })
  @IsOptional()
  @IsArray()
  permissions?: Permission[];
}
