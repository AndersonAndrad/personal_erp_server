import { Category } from '@app/core/interfaces/category.interface';
import { IncomeStatementSchema } from './income-statement.interface';
import mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema<Category>({
  description: { type: String },
  name: { type: String, required: true },
  disabled: { type: Boolean },
  IR: { type: Boolean },
  incomeStatement: { type: IncomeStatementSchema },
});

export const CategoryModel: mongoose.Model<Category> = mongoose.model('category', CategorySchema);
