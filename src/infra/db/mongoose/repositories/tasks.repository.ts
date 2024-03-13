import {
  Task,
  TaskNotation,
} from '../../../../core/interfaces/tasks.interface';

import { TaskRepositoryDb } from '@app/core/db-repositories/tasks-repository.interface';
import { Injectable } from '@nestjs/common';
import { PaginatedResponse } from '../../../../core/interfaces/response.interface';

@Injectable()
export class MongooseTaskRepository implements TaskRepositoryDb {
  finishTask(taskId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  addNotation(
    taskId: string,
    notation: Pick<TaskNotation, 'notation'>,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  toggleStatusPause(taskId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  create(task: Omit<Task, '_id' | 'tasks'>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findOne(taskId: string): Promise<Task> {
    throw new Error('Method not implemented.');
  }

  findAll(filter: any): Promise<PaginatedResponse<Task>> {
    throw new Error('Method not implemented.');
  }

  update(taskId: string, task: Partial<Omit<Task, '_id'>>): Promise<void> {
    throw new Error('Method not implemented');
  }

  delete(taskId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
