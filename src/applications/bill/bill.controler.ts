import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BillFindAll } from '@app/core/interfaces/bill.interface';
import { BillService } from './services/bill.service';

@ApiTags('Bill')
@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) { }

  @Get('')
  @ApiOperation({ summary: 'Find all bills by filter' })
  findAll(@Query() filter: BillFindAll) {
    return this.billService.findAll(filter);
  }
}
