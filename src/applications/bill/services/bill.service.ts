import { BillRepositoryDb, BillRepositorySymbol } from '@app/core/db-repositories/bill-repository.interface';
import { Bill } from '@app/core/interfaces/bill.interface';
import { PaginatedResponse } from '@app/core/interfaces/response.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class BillService {
  constructor(@Inject(BillRepositorySymbol) private readonly billRepository: BillRepositoryDb) { }

  async save(entities: Omit<Bill, '_id'>[]): Promise<any> {
    return this.billRepository.save(entities);
  }

  async create(entity: Omit<Bill, '_id'>): Promise<void> {
    return await this.billRepository.create(entity);
  }

  findAll(filter: any): Promise<PaginatedResponse<Bill>> {
    throw new Error('Method not implemented.');
  }
  update(entityId: string, entity: Partial<Omit<Bill, '_id'>>): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(entityId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(entityId: string): Promise<Bill> {
    throw new Error('Method not implemented.');
  }
}
