import { AccountBankSymbol, MonthHistorySymbol } from '@app/core/db-repositories/account-bank.repository';
import { MongooseAccountBankRespository, MongooseMonthHistoryRespository } from '@app/infra/db/mongoose/repositories/mongoose-account-bank.respository';

import { AccountBankController } from './controllers/account-bank.controller';
import { AccountBankService } from './services/account-bank.service';
import { BillModule } from '../bill/bill.module';
import { Module } from '@nestjs/common';
import { MonthHistoryController } from './controllers/month-history.controllers';
import { MonthHistoryService } from './services/month-history.service';

@Module({
  controllers: [AccountBankController, MonthHistoryController],
  imports: [BillModule],
  providers: [
    AccountBankService,
    MonthHistoryService,
    {
      provide: AccountBankSymbol,
      useClass: MongooseAccountBankRespository,
    },
    {
      provide: MonthHistorySymbol,
      useClass: MongooseMonthHistoryRespository,
    },
  ],
})
export class AccountBankModule { }
