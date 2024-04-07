import { IncomeStatement } from './income-statement.interface';

export interface Category {
  _id: string;
  name: string;
  description: string;
  type: any;
  IR: boolean;
  parentCategory: Category;
  disabled: boolean;
  incomeStatement: IncomeStatement;
}
