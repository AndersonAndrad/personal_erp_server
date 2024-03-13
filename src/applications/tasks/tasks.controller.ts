import { Controller } from '@nestjs/common';
import { TaskService } from './services/tasks.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
}
