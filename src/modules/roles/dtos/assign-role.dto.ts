import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {

  @ApiProperty({ example: '64cfa0e6f8b9a3a2a9c1d111', description: 'User ID to whom the role will be assigned' })
  @IsMongoId()
  userId: string;

  @ApiProperty({ example: '64cfa0e6f8b9a3a2a9c1d222', description: 'Role ID that will be assigned to the user' })
  @IsMongoId()
  roleId: string;
}
