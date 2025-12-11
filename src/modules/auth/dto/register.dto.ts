import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    required: true,
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    required: true,
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
    required: true,
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password. Minimum 6 characters.',
    example: 'secret123',
    required: true,
    minLength: 6,
  })
  @MinLength(6)
  password: string;
}
