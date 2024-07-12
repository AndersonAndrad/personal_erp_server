import { AccountBank, TypeAccountBank } from '@app/core/interfaces/account-bank.interface';
import { ApiProperty } from '@nestjs/swagger';

export class AccountBankDto implements Omit<AccountBank, '_id'> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  currency: number;

  @ApiProperty()
  accountNumber: string;

  @ApiProperty()
  agencyNumber: string;

  @ApiProperty()
  typeAccount: TypeAccountBank;

  @ApiProperty()
  disabled: boolean;

  @ApiProperty()
  bank: string;
}
