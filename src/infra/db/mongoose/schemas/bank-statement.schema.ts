import { Statement, TypeStatement } from '@app/core/interfaces/bank-statement.interface';

import { AccountBankSchema } from './account-bank.schema';
import mongoose from 'mongoose';

export const StatementSchema = new mongoose.Schema<Statement>({
  date: { type: Date, required: true },
  externalId: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: TypeStatement },
  accountBank: AccountBankSchema,
  currency: { type: Number },
});

export const StatementModel: mongoose.Model<Statement> = mongoose.model('statement', StatementSchema);
