import { DefaultAuthentication } from '@app/core/interfaces/authentication.interface';
import { ApiProperty } from '@nestjs/swagger';

export class DefaultAuthenticatopnDto implements DefaultAuthentication {
  @ApiProperty({ description: 'NickName or Email to login', minLength: 3, required: true })
  login: string;

  @ApiProperty({ description: 'Password', minLength: 3, required: true })
  password: string;
}
