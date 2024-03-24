import { TaskNotation } from '@app/core/interfaces/tasks.interface';
import { ApiProperty } from '@nestjs/swagger';

export class AddNotationDto implements Pick<TaskNotation, 'notation'> {
  @ApiProperty()
  notation: string;
}
