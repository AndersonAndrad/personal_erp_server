import { AccountBank } from './account-bank.interface';
import { Category } from './category.interface';
import { PaginatedRequest } from './response.interface';

export interface BillFindAll extends PaginatedRequest { }
export interface Bill {
  _id: string;
  dueDate?: Date;
  paidDate?: Date;
  totalPaid?: number;
  observation?: string;
  description: string;
  parentPaid?: Bill;
  installmentValue?: number;
  code: string;
  totalValue: number;
  paidOut?: boolean;
  accountBank: AccountBank;
  client?: any /** @todo add client interface  */;
  provider?: any /** @todo add provider interface  */;
  category?: Category;
  cashFlow: CashFlow;
}

export enum CashFlow {
  EXPENSES = 'expenses',
  INCOME = 'income',
}
