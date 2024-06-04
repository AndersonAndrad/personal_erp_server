import { DefaultLoginDto as DefaultAuthenticatopnDto } from '@app/core/dto/login/default-authentication.dto';
import { Body, Controller, Post } from '@nestjs/common';

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
