import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';

@Module({
  providers: [],
  controllers: [RoleController],
})
export class RoleModule {}
