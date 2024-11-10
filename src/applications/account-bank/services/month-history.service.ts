import * as csvParser from 'csv-parser';

import { BadRequestException, Injectable } from '@nestjs/common';
import { Bill, CashFlow } from '@app/core/interfaces/bill.interface';

import { AccountBank } from '@app/core/interfaces/account-bank.interface';
import { AccountBankService } from './account-bank.service';
import { BillService } from '@app/applications/bill/services/bill.service';
import { Readable } from 'stream';

interface Transaction {
  Data: string;
  Valor: string;
  Identificador: string;
  Descrição: string;
}

@Injectable()
export class MonthHistoryService {
  constructor(
    private readonly billService: BillService,
    private readonly accountBankService: AccountBankService,
  ) { }

  async saveCSVBankStattement(file: Express.Multer.File, accountBankId: AccountBank['_id']): Promise<void> {
    const results = [];
    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);

    const saveBankStattements = async (data: any[], accountBankId: AccountBank['_id']): Promise<void> => {
      const accountBank = await this.accountBankService.findById(accountBankId);

      const bills: Omit<Bill, '_id'>[] = data.map<Omit<Bill, '_id'>>((item: Transaction) => {
        return {
          description: item['Descrição'],
          code: item.Identificador,
          totalValue: Number(item.Valor),
          accountBank: accountBank,
          cashFlow: Number(item.Valor) > 0 ? CashFlow.INCOME : CashFlow.EXPENSES,
        };
      });

      return await this.billService.save(bills);
    };

    readableStream
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        await saveBankStattements(results, accountBankId);
      })
      .on('error', (error) => {
        throw new BadRequestException(`Processing file: ${error.message}`);
      });
  }
}
