import { User } from '@app/core/interfaces/user.interface';

import { CreateUserDto } from '@app/core/dto/user/create-user.dto';
import { PaginatedResponse } from '@app/core/interfaces/response.interface';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from './services/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @ApiOperation({ description: 'Create user' })
  create(@Body() payload: CreateUserDto): Promise<void> {
    return this.userService.create(payload);
  }

  @Get('')
  @ApiOperation({ description: 'Search users by filter' })
  findAll(filter: any): Promise<PaginatedResponse<User>> {
    return this.userService.findAll(filter);
  }

  @Get(':userId')
  @ApiParam({ name: 'userId' })
  @ApiOperation({ description: 'Find user by id' })
  findOne(@Param('userId') userId: string): Promise<User> {
    return this.userService.findOne(userId);
  }

  @Patch(':userId')
  @ApiParam({ name: 'userId' })
  @ApiOperation({ description: 'Find user and update user by id' })
  update(@Param('userId') userId: string, @Body() user: any): Promise<void> {
    return this.userService.update(userId, user);
  }

  @Delete(':userId')
  @ApiParam({ name: 'userId' })
  @ApiOperation({ description: 'Find user and delete user by id' })
  delete(userId: string): Promise<void> {
    return this.userService.delete(userId);
  }

  @Patch(':userId')
  @ApiParam({ name: 'userId' })
  @ApiOperation({ description: 'Find user and designate role in user' })
  designateRole(@Param('userId') userId: string, @Body() role: any): Promise<void> {
    return this.userService.designateRole(userId, role);
  }

  @Patch(':userId')
  @ApiParam({ name: 'userId' })
  @ApiOperation({ description: 'Find user and change access status' })
  changeUserAccessStatus(userId: string, blocked: boolean): Promise<void> {
    return this.userService.changeUserAccessStatus(userId, blocked);
  }
}
