import { AccountBank, MonthHistory } from '../interfaces/account-bank.interface';
import { BasicCrudRepositoryDb } from './basic-crud.repository';

export const AccountBankSymbol = Symbol('accountBankRepositoryDb');

export interface AccountBankRepositoryDb extends BasicCrudRepositoryDb<AccountBank> {}

export interface MonthHistoryRespositoryDb extends BasicCrudRepositoryDb<MonthHistory> {}
