import { BillRepositoryDb } from '@app/core/db-repositories/bill-repository.interface';
import { Bill } from '@app/core/interfaces/bill.interface';
import { PaginatedResponse } from '@app/core/interfaces/response.interface';
import { Injectable } from '@nestjs/common';
import { BillModel } from '../schemas/bill.schema';

interface BulkWriteResult {
  insertedCount: number;
  matchedCount: number;
  modifiedCount: number;
  deletedCount: number;
  upsertedCount: number;
}

@Injectable()
export class MongooseBillRepository implements BillRepositoryDb {
  async save(entities: Omit<Bill, '_id'>[]): Promise<any> {
    const operations = entities.map((entity) => ({
      updateOne: {
        filter: { code: entity.code },
        update: { $setOnInsert: entity },
        upsert: true,
      },
    }));

    const result: BulkWriteResult = await BillModel.bulkWrite(operations, { ordered: false });

    return result;
  }

  async create(entity: Omit<Bill, '_id'>): Promise<void> {
    await BillModel.create(entity);
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
