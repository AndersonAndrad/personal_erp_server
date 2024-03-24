import { AddNotationDto } from '@app/core/dto/tasks/add-notation.dto';
import { CreateTaskDto } from '@app/core/dto/tasks/create-tasks.dto';
import { UpdateTaskDto } from '@app/core/dto/tasks/update-tasks.dto';
import { Filter, Task } from '@app/core/interfaces/tasks.interface';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TaskService } from './services/tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  @ApiOperation({ description: 'Create a task' })
  create(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.create(task);
  }

  @Get('')
  @ApiOperation({ description: 'Find all tasks' })
  findAll(@Query() filter: Filter) {
    return this.taskService.findAll(filter);
  }

  @Get(':taskId')
  @ApiParam({ name: 'taskId' })
  @ApiOperation({ description: 'Find only one task by id' })
  findOne(@Param('taskId') taskId: Task['_id']): Promise<Task> {
    return this.taskService.findOne(taskId);
  }

  @Delete(':taskId')
  @ApiParam({ name: 'taskId' })
  @ApiOperation({ description: 'Delete only one task by Id' })
  delete(@Param('taskId') taskId: Task['_id']): Promise<void> {
    return this.taskService.delete(taskId);
  }

  @Patch(':taskId')
  @ApiParam({ name: 'taskId' })
  @ApiOperation({ description: 'Update a task' })
  update(@Param('taskId') taskId: Task['_id'], @Body() update: UpdateTaskDto) {
    return this.taskService.update(taskId, update);
  }

  @Patch(':taskId/toggle-status')
  @ApiParam({ name: 'taskId' })
  @ApiOperation({ description: 'Toggle paused status by id' })
  toggleStatusPaude(@Param('taskId') taskId: Task['_id']): Promise<void> {
    return this.taskService.toggleStatusPause(taskId);
  }

  @Post(':taskId/add-notation')
  @ApiParam({ name: 'taskId' })
  @ApiOperation({ description: 'Add notation in only one task by id' })
  addNotation(@Param('taskId') taskId: Task['_id'], @Body() notation: AddNotationDto) {
    return this.taskService.addNotation(taskId, notation);
  }
}
