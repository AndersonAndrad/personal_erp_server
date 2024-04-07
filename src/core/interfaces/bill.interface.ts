import { Category } from './category.interface';

export interface Bill {
  _id: string;
  dueDate: Date;
  paidDate?: Date;
  totalPaid: number;
  observation: string;
  description: string;
  parentPaid: Bill;
  installmentValue: number;
  code: string;
  totalValue: number;
  paidOut: boolean;
  accountBank: any /** @todo add interface to account bank */;
  client: any /** @todo add client interface  */;
  provider: any /** @todo add provider interface  */;
  typePayment: any /** @todo add type payment interface  */;
  category: Category;
  cashFlow: any /** @todo add cashFlow enum */;
}
