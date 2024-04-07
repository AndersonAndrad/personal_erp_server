import { Bill } from '@app/core/interfaces/bill.interface';
import { CategorySchema } from './category.schema';
import mongoose from 'mongoose';

/**
 * @todo implements rest properties by bill
 */
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
});

export const BillModel: mongoose.Model<Bill> = mongoose.model('bill', BillSchema);
