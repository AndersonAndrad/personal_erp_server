import { BillRepositoryDb } from '@app/core/db-repositories/bill-repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongooseBillRepository implements BillRepositoryDb {}
