import { Task, TaskNotation } from '../interfaces/tasks.interface';

import { PaginatedResponse } from '../interfaces/response.interface';

export interface TaskRepositoryDb {
  /**
   * @param task
   */
  create(task: Omit<Task, '_id' | 'tasks'>): Promise<void>;

  /**
   * @param taskId
   */
  findOne(taskId: Task['_id']): Promise<Task>;

  /**
   * @TODO implement filter interface
   * @param filter
   */
  findAll(filter: any): Promise<PaginatedResponse<Task>>;

  /**
   * @param task
   * @param taskId
   */
  update(taskId: Task['_id'], task: Partial<Omit<Task, '_id'>>): Promise<void>;

  /**
   * @param taskId
   */
  delete(taskId: Task['_id']): Promise<void>;

  /**
   * @param taskId
   */
  finishTask(taskId: Task['_id']): Promise<void>;

  /**
   * @param notation
   * @param taskId
   */
  addNotation(
    taskId: Task['_id'],
    notation: Pick<TaskNotation, 'notation'>,
  ): Promise<void>;

  /**
   * @param taskId
   */
  toggleStatusPause(taskId: Task['_id']): Promise<void>;
}
