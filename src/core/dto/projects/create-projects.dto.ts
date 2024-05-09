import { Project } from '@app/core/interfaces/project.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto implements Omit<Project, '_id' | 'tasks' | 'enabled'> {
  @ApiProperty({ description: 'Project name' })
  name: string;

  @ApiProperty({ description: 'Price per hours' })
  hoursPrice: number;

  @ApiProperty({ description: 'Expected hours to work per day' })
  expectedHoursPerDay: number;
}
