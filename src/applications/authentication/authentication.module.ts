import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthenticationController } from './authentication.controller';
import { DefaultAuthenticationService } from './services/default-authentication.service';
import { JWTService } from './services/jwt.service';

@Module({
  providers: [DefaultAuthenticationService, JWTService],
  controllers: [AuthenticationController],
  imports: [UserModule],
})
export class AuthenticationModule { }
