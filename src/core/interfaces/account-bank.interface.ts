export interface AccountBank {
  _id: string;
  name: string;
  currency: number;
  accountNumber: string;
  agencyNumber: string;
  typeAccount: TypeAccountBank;
  disabled: boolean;
  bank: string;
  color: string;
}

export interface MonthHistory {
  _id: string;
  month: Date;
  currency: number;
  bills: Bill[];
  accountBank: AccountBank;
}

export interface Bill {
  identificator: string;
  currency: number;
  description: string;
}

export enum TypeAccountBank {
  PJ = 'pessoa_juridica',
  PF = 'pessoa_fisica',
}
