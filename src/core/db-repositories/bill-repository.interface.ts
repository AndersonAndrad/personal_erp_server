import { Bill, BillFindAll } from '../interfaces/bill.interface';

import { PaginatedResponse } from '../interfaces/response.interface';
import { BasicCrudRepositoryDb } from './basic-crud.repository';

export const BillRepositorySymbol = Symbol('billRepositoryDb');

export interface BillRepositoryDb extends BasicCrudRepositoryDb<Bill> {
  save(entities: Omit<Bill, '_id'>[]): Promise<any>;

  findAll(filter: BillFindAll): Promise<PaginatedResponse<Bill>>;
}
