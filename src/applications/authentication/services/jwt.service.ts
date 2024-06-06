import * as jsonwebtoken from 'jsonwebtoken';

import { Injectable } from '@nestjs/common';

@Injectable()
export class JWTService {
  private hashJwt: string = process.env.JWT_TOKEN;

  /**
   * @param userData
   */
  sign(userData: any) {
    return jsonwebtoken.sign(userData, this.hashJwt, { expiresIn: '1h' });
  }

  /**
   * @param jwt
   */
  verify(jwt: string) {
    return jsonwebtoken.verify(jwt, this.hashJwt);
  }

  /**
   * @param jwt
   */
  decode(jwt: string) {
    return jsonwebtoken.decode(jwt, { complete: true, json: true });
  }
}
