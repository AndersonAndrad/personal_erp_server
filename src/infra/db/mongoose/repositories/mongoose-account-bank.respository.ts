import { AccountBankRepositoryDb, MonthHistoryRespositoryDb } from '@app/core/db-repositories/account-bank.repository';
import { AccountBank, MonthHistory } from '@app/core/interfaces/account-bank.interface';
import { PaginatedResponse } from '@app/core/interfaces/response.interface';
import { Injectable } from '@nestjs/common';
import { AccountBankModel } from '../schemas/account-bank.schema';

@Injectable()
export class MongooseAccountBankRespository implements AccountBankRepositoryDb {
  async create(entity: Omit<AccountBank, '_id'>): Promise<void> {
    await AccountBankModel.create(entity);
  }

  async findAll(filter: any): Promise<PaginatedResponse<AccountBank>> {
    const accountsBank = await AccountBankModel.find(filter);

    /**
     * @todo implement total count when return accounts banks
     */
    return {
      items: JSON.parse(JSON.stringify(accountsBank)),
      meta: { quantityItems: 0 },
    };
  }

  update(entityId: string, entity: Partial<Omit<AccountBank, '_id'>>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(entityId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

@Injectable()
export class MongooseMonthHistoryRespository implements MonthHistoryRespositoryDb {
  create(entity: Omit<MonthHistory, '_id'>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findAll(filter: any): Promise<PaginatedResponse<MonthHistory>> {
    throw new Error('Method not implemented.');
  }

  update(entityId: string, entity: Partial<Omit<MonthHistory, '_id'>>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(entityId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
