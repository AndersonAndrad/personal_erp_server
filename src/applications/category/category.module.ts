import { CategoryController } from './category.controller';
import { CategoryRepositorySymbol } from '@app/core/db-repositories/category-repository.interface';
import { CategoryService } from './services/category.service';
import { Module } from '@nestjs/common';
import { MongooseCategoryRepository } from '@app/infra/db/mongoose/repositories/mongoose-category.repository';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, { provide: CategoryRepositorySymbol, useClass: MongooseCategoryRepository }],
})
export class CategoryModule {}
