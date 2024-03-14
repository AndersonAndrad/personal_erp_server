import {
  Task,
  TaskNotation,
} from '../../../../core/interfaces/tasks.interface';

import { TaskRepositoryDb } from '@app/core/db-repositories/tasks-repository.interface';
import { Injectable } from '@nestjs/common';
import { PaginatedResponse } from '../../../../core/interfaces/response.interface';
import { TasksModel } from '../schemas/tasks.schema';

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

  async create(task: Omit<Task, '_id' | 'tasks'>): Promise<Task> {
    const taskCreated = await TasksModel.create(task);

    return JSON.parse(JSON.stringify(taskCreated));
  }

  async findOne(taskId: string): Promise<Task> {
    const task = await TasksModel.findById(taskId);

    return JSON.parse(JSON.stringify(task));
  }

  async findAll(filter: any): Promise<PaginatedResponse<Task>> {
    let tasks = [];
    let quantityItems: number = 0;

    if ('page' in filter && 'size' in filter) {
      tasks = await TasksModel.find({});
    } else {
      tasks = await TasksModel.find({});
      quantityItems = tasks.length;
    }

    return {
      items: JSON.parse(JSON.stringify(tasks)),
      meta: {
        quantityItems,
      },
    };
  }

  update(taskId: string, task: Partial<Omit<Task, '_id'>>): Promise<void> {
    throw new Error('Method not implemented');
  }

  delete(taskId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
