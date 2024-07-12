import { AccountBankSymbol } from '@app/core/db-repositories/account-bank.repository';
import { MongooseAccountBankRespository } from '@app/infra/db/mongoose/repositories/mongoose-account-bank.respository';
import { Module } from '@nestjs/common';
import { AccountBankController } from './controllers/account-bank.controller';
import { MonthHistoryController } from './controllers/month-history.controllers';
import { AccountBankService } from './services/account-bank.service';
import { MonthHistoryService } from './services/month-history.service';

@Module({
  controllers: [AccountBankController, MonthHistoryController],
  providers: [
    AccountBankService,
    MonthHistoryService,
    {
      provide: AccountBankSymbol,
      useClass: MongooseAccountBankRespository,
    },
  ],
})
export class AccountBankModule {}
