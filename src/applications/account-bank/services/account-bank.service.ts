import { AccountBankRepositoryDb, AccountBankSymbol } from '@app/core/db-repositories/account-bank.repository';
import { AccountBank } from '@app/core/interfaces/account-bank.interface';
import { PaginatedResponse } from '@app/core/interfaces/response.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AccountBankService {
  constructor(@Inject(AccountBankSymbol) private readonly accountBankRepository: AccountBankRepositoryDb) { }

  create(entity: Omit<AccountBank, '_id' | 'currency'>): Promise<void> {
    return this.accountBankRepository.create(entity);
  }

  findAll(filter: any): Promise<PaginatedResponse<AccountBank>> {
    return this.accountBankRepository.findAll(filter);
  }

  update(entityId: string, entity: Partial<Omit<AccountBank, '_id'>>): Promise<void> {
    return this.accountBankRepository.update(entityId, entity);
  }

  delete(entityId: string): Promise<void> {
    return this.accountBankRepository.delete(entityId);
  }
}
