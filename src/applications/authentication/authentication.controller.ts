import { Body, Controller, Post } from '@nestjs/common';

import { DefaultAuthenticatopnDto } from '@app/core/dto/authentication/default-authentication.dto';
import { ApiTags } from '@nestjs/swagger';
import { DefaultAuthenticationService } from './services/default-authentication.service';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly defaultAuthenticationService: DefaultAuthenticationService) {}

  @Post('default')
  defaultAuthentication(@Body() defaultAuthenticationData: DefaultAuthenticatopnDto) {
    return this.defaultAuthenticationService.authentication(defaultAuthenticationData);
  }
}
