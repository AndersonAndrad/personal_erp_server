import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('Bill')
@Controller('bill')
export class BillController {}
