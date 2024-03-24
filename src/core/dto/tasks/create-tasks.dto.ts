import { Project } from '@app/core/interfaces/project.interface';
import { Task } from '@app/core/interfaces/tasks.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto implements Pick<Task, 'name' | 'description' | 'project'> {
  @ApiProperty({})
  name: string;

  @ApiProperty({})
  description: string;

  @ApiProperty({})
  project: Omit<Project, 'tasks' | 'enabled'>;
}
