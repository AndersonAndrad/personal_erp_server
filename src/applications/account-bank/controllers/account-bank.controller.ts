import { AccountBankDto } from '@app/core/dto/account-bank/create-account-bank.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountBankService } from '../services/account-bank.service';

@ApiTags('Account Bank')
@Controller('account-bank')
export class AccountBankController {
  constructor(private readonly accountService: AccountBankService) {}

  @Post('')
  async create(@Body() body: AccountBankDto) {
    return this.accountService.create(body);
  }

  @Get('')
  async findAll() {
    return this.accountService.findAll({});
  }

  @Put(':entityId')
  async update(@Param('entityId') entityId: string, @Body() body: any) {
    return this.accountService.update(entityId, body);
  }

  @Delete(':entityId')
  async delete(@Param('entityId') entityId: string) {
    return this.accountService.delete(entityId);
  }
}
