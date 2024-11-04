import { Bill, CashFlow } from '@app/core/interfaces/bill.interface';

import { AccountBankSchema } from './account-bank.schema';
import { CategorySchema } from './category.schema';
import mongoose from 'mongoose';

export const BillSchema = new mongoose.Schema<Bill>({
  category: { type: CategorySchema, required: true },
  code: { type: String },
  description: { type: String, required: true },
  dueDate: { type: Date },
  paidDate: { type: Date },
  installmentValue: { type: Number },
  observation: { type: String },
  paidOut: { type: Boolean },
  totalPaid: { type: Number },
  totalValue: { type: Number },
  cashFlow: { type: String, enum: CashFlow },
  accountBank: { type: AccountBankSchema },
});

export const BillModel: mongoose.Model<Bill> = mongoose.model('bill', BillSchema);
