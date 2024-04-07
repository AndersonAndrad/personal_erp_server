import { IncomeStatement } from '@app/core/interfaces/income-statement.interface';
import mongoose from 'mongoose';

export const IncomeStatementSchema = new mongoose.Schema<IncomeStatement>({});

export const IncomeStatementModel: mongoose.Model<IncomeStatement> = mongoose.model('income-statement', IncomeStatementSchema);
