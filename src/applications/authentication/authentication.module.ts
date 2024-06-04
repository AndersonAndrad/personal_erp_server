import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { DefaultAuthenticationService } from './services/default-authentication.service';
import { JWTService } from './services/jwt.service';

@Module({
  providers: [DefaultAuthenticationService, JWTService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
