import { AccountBank } from './account-bank.interface';

export enum TypeStatement {
  INCOME = 'income', // renda
  EXPENSE = 'expense', // despesa
}
export interface Statement {
  _id: string;
  date: Date;
  currency: number;
  externalId: string;
  description: string;
  accountBank: AccountBank;
  category: TypeStatement;
}

export interface NubankStatement extends Statement { }

export interface NubankCSV {
  Data: string;
  Valor: string;
  Identificador: string;
  Descrição: string;
}
