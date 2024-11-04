import { Bill } from '../interfaces/bill.interface';
import { BasicCrudRepositoryDb } from './basic-crud.repository';

export const BillRepositorySymbol = Symbol('billRepositoryDb');

export interface BillRepositoryDb extends BasicCrudRepositoryDb<Bill> {
  save(entities: Omit<Bill, '_id'>[]): Promise<any>;
}
