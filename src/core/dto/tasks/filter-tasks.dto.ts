import { Filter } from '@app/core/interfaces/tasks.interface';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterTasksDto implements Filter {
  @ApiPropertyOptional()
  hashId?: string[];
}
