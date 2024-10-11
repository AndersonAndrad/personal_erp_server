import { AccountBank, TypeAccountBank } from '@app/core/interfaces/account-bank.interface';

import { ApiProperty } from '@nestjs/swagger';

export class AccountBankDto implements Omit<AccountBank, '_id' | 'currency'> {
  @ApiProperty()
  name: string;

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

  @ApiProperty({ description: 'Color used to show in the frontend graphics' })
  color: string;
}
