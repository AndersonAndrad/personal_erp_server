import { AccountBank, Bill, MonthHistory, TypeAccountBank } from '@app/core/interfaces/account-bank.interface';

import mongoose from 'mongoose';

export const AccountBankSchema = new mongoose.Schema<AccountBank>({
  accountNumber: { type: String },
  agencyNumber: { type: String },
  bank: { type: String },
  currency: { type: Number, default: 0 },
  disabled: { type: Boolean, default: false },
  name: { type: String },
  color: { type: String },
  typeAccount: { enum: [TypeAccountBank.PJ, TypeAccountBank.PF] },
});

export const BillSchema = new mongoose.Schema<Bill>({
  currency: { type: Number },
  description: { type: String },
  identificator: { type: String },
});

export const MonthHistorySchema = new mongoose.Schema<MonthHistory>({
  accountBank: { type: AccountBankSchema },
  bills: { type: [BillSchema] },
  currency: { type: Number },
  month: { type: Date },
});

export const AccountBankModel: mongoose.Model<AccountBank> = mongoose.model('account_bank', AccountBankSchema);

export const MonthHistoryModel: mongoose.Model<MonthHistory> = mongoose.model('month_history', MonthHistorySchema);
