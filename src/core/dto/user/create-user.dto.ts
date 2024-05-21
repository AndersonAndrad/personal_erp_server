import { Role, User } from '@app/core/interfaces/user.interface';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements Omit<User, '_id' | 'team'> {
  @ApiProperty({ description: 'User name', type: 'string', maxLength: 60, required: true })
  name: string;

  @ApiProperty({ description: 'Nick name to login and show to others users', type: 'string', maxLength: 30, required: true })
  nickName: string;

  @ApiProperty({ description: 'User email', type: 'string', maxLength: 100, required: true })
  email: string;

  @ApiProperty({ description: 'Primary password', type: 'string', maxLength: 160, required: true })
  password: string;

  @ApiProperty({ description: 'Confirmation password, required the same primary password', type: 'string', maxLength: 160, required: true })
  confirmPassword: string;

  @ApiProperty({ description: 'User roles', type: 'array', required: true })
  roles: Role[];

  @ApiProperty({ description: 'User blocked access to system', type: 'boolean', required: false, default: false })
  blocked: boolean;
}
