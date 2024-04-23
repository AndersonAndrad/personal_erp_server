import { Filter, Pause, Task, TaskNotation } from '@app/core/interfaces/tasks.interface';

import { TaskRepositoryDb } from '@app/core/db-repositories/tasks-repository.interface';
import { PaginatedResponse } from '@app/core/interfaces/response.interface';
import { Injectable } from '@nestjs/common';
import { TasksModel } from '../schemas/tasks.schema';

export const TaskRepositorySymbol = Symbol('taskRepositoryDb');

@Injectable()
export class MongooseTaskRepository implements TaskRepositoryDb {
  async pause(taskId: string, pauseTask: Partial<Omit<Pause, '_id'>>): Promise<void> {
    const task = await TasksModel.findOne({ _id: taskId });

    if (!task) throw new Error(`Task with ID ${taskId} not found`);

    if (task.paused) {
      await TasksModel.updateOne({ _id: taskId }, { 'pauses.0.end': pauseTask?.end ?? new Date(), paused: !task.paused });
    } else {
      const result: Partial<Omit<Pause, '_id'>> = { start: pauseTask?.start ?? new Date(), activityBeforePause: pauseTask?.activityBeforePause ?? '' };
      await TasksModel.updateOne({ _id: taskId }, { $push: { pauses: { $each: [result], $position: 0 } }, paused: !task.paused });
    }
  }

  async getNotationsByTask(taskId: string): Promise<TaskNotation[]> {
    const task = await TasksModel.findOne({ _id: taskId });

    return JSON.parse(JSON.stringify(task.notations));
  }

  async deleteNotation(taskId: string, notationId: string): Promise<void> {
    let task = await TasksModel.findOne({ _id: taskId });

    task = JSON.parse(JSON.stringify(task));

    task.notations = task.notations.filter((notation) => notation._id !== notationId);

    await this.update(taskId, { notations: task.notations });
  }

  async finishTask(taskId: string): Promise<void> {
    await this.update(taskId, { finished: true, finish: new Date() });
  }

  async addNotation(taskId: string, notation: Pick<TaskNotation, 'notation'>): Promise<void> {
    await TasksModel.updateOne({ _id: taskId }, { $push: { notations: { $each: [notation], $position: 0 } } });
  }

  async toggleStatusPause(taskId: string): Promise<void> {
    const task = await this.findOne(taskId);

    await this.update(taskId, { paused: !task.paused });
  }

  async create(task: Omit<Task, '_id' | 'notation'>): Promise<Task> {
    const taskCreated = await TasksModel.create(task);

    return JSON.parse(JSON.stringify(taskCreated));
  }

  async findOne(taskId: string): Promise<Task> {
    const task = await TasksModel.findById(taskId);

    return JSON.parse(JSON.stringify(task));
  }

  async findAll(filter: Filter): Promise<PaginatedResponse<Task>> {
    let tasks = [];
    let quantityItems: number = 0;
    const query = {};
    const finishQuery = {};

    if ('projectIds' in filter) {
      query['project._id'] = { $in: filter.projectIds };
    }

    if ('start' in filter) {
      const start = new Date(new Date(filter.start).setHours(0, 0, 0, 0));

      let finish = new Date(new Date(filter.start).setHours(23, 59, 59, 999));

      if ('finish' in filter) {
        finish = new Date(new Date(filter.finish).setHours(23, 59, 59, 999));
      }

      query['start'] = { $gte: start, $lt: finish };
      finishQuery['finish'] = { $gte: start, $lt: finish };
    } else if ('finish' in filter) {
      const start = new Date(new Date(filter.finish).setHours(0, 0, 0, 0));

      let finish = new Date(new Date(filter.finish).setHours(23, 59, 59, 999));

      if ('start' in filter) {
        finish = new Date(new Date(filter.finish).setHours(23, 59, 59, 999));
      }

      query['start'] = { $gte: start, $lt: finish };
      finishQuery['finish'] = { $gte: start, $lt: finish };
    }

    if ('scheduled' in filter) {
      query['scheduled'] = filter.scheduled;
    }

    if ('page' in filter && 'size' in filter) {
      tasks = await TasksModel.find({ $and: [{ ['project._id']: { $in: filter.projectIds } }, { $or: [query, finishQuery, { paused: { $in: [true, false] }, finished: false }] }] });
    } else {
      tasks = await TasksModel.find({ $and: [{ ['project._id']: { $in: filter.projectIds } }, { $or: [query, finishQuery, { paused: { $in: [true, false] }, finished: false }] }] });
      quantityItems = tasks.length;
    }

    return {
      items: JSON.parse(JSON.stringify(tasks)),
      meta: {
        quantityItems,
      },
    };
  }

  async update(taskId: string, task: Partial<Omit<Task, '_id'>>): Promise<void> {
    await TasksModel.updateOne({ _id: taskId }, task);
  }

  async delete(taskId: string): Promise<void> {
    await TasksModel.deleteOne({ _id: taskId });
  }
}
