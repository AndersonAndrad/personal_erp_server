import { Filter } from '@app/core/interfaces/tasks.interface';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterDashboardTask implements Filter {
  @ApiPropertyOptional()
  hashId?: string[];

  @ApiPropertyOptional()
  start?: Date;

  @ApiPropertyOptional()
  finish?: Date;
}
