import { DefaultAuthentication } from '@app/core/interfaces/authentication.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DefaultAuthenticationService {
  authentication(authenticationData: DefaultAuthentication) {
    console.log({ defaultLoginData: authenticationData });
  }
}
