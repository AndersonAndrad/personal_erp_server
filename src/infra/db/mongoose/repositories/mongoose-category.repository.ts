import { CategoryRepositoryDb } from '@app/core/db-repositories/category-repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongooseCategoryRepository implements CategoryRepositoryDb {}
