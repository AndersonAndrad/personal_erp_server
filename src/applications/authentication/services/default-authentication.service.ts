import * as bcrypt from 'bcrypt';

import { DefaultAuthentication } from '@app/core/interfaces/authentication.interface';
import { Injectable } from '@nestjs/common';
import { JWTService } from './jwt.service';
import { UserService } from '@app/applications/user/services/user.service';

@Injectable()
export class DefaultAuthenticationService {
  constructor(
    private readonly jwt: JWTService,
    private readonly userService: UserService,
  ) { }

  async authentication(authenticationData: DefaultAuthentication) {
    const { login, password } = authenticationData;
    const user = await this.userService.findByLogin(login.trim());

    if (!user) throw new Error('User not found');

    if (!bcrypt.compareSync(`${password}/${user.nickName.toLowerCase().trim()}`, user.password)) throw new Error('Password not match');

    return this.jwt.sign({
      name: user.name,
      nickName: user.nickName,
      email: user.email,
      roles: user.roles,
      blocked: user.blocked,
      userHash: user.userHash,
    });
  }
}
