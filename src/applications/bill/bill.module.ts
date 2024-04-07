import { BillController } from './bill.controler';
import { BillRepositorySymbol } from '@app/core/db-repositories/bill-repository.interface';
import { BillService } from './services/bill.service';
import { Module } from '@nestjs/common';
import { MongooseBillRepository } from '@app/infra/db/mongoose/repositories/mongoose-bill.repository';

@Module({
  controllers: [BillController],
  providers: [BillService, { provide: BillRepositorySymbol, useClass: MongooseBillRepository }],
})
export class BillModule {}
