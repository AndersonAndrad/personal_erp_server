import { MongooseUserRepository, UserRepositorySymbol } from '@app/infra/db/mongoose/repositories/mongoose-user.repository';

import { UserSchemaValidator } from '@app/core/schame-validation/user-schema.validation';
import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserSchemaValidator, UserService, { provide: UserRepositorySymbol, useClass: MongooseUserRepository }],
})
export class UserModule {}
