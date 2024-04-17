import { Pause } from '@app/core/interfaces/tasks.interface';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PauseTaskDto implements Partial<Omit<Pause, '_id'>> {
  @ApiPropertyOptional()
  activityBeforePause?: string;

  @ApiPropertyOptional()
  start?: Date;

  @ApiPropertyOptional()
  end?: Date;
}
