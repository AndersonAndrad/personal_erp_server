import { Filter, Task, TaskNotation } from '../interfaces/tasks.interface';

import { PaginatedResponse } from '../interfaces/response.interface';

export interface TaskRepositoryDb {
  /**
   * @param task
   */
  create(task: Pick<Task, 'name' | 'description' | 'project' | 'start'>): Promise<Task>;

  /**
   * @param taskId
   */
  findOne(taskId: Task['_id']): Promise<Task>;

  /**
   * @param filter
   */
  findAll(filter: Filter): Promise<PaginatedResponse<Task>>;

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
  addNotation(taskId: Task['_id'], notation: Pick<TaskNotation, 'notation'>): Promise<void>;

  /**
   * @param taskId
   */
  toggleStatusPause(taskId: Task['_id']): Promise<void>;

  /**
   * @param notationId
   * @param taskId
   */
  deleteNotation(taskId: Task['_id'], notationId: TaskNotation['_id']): Promise<void>;

  /**
   * @param taskId
   */
  getNotationsByTask(taskId: Task['_id']): Promise<TaskNotation[]>;

  /**
   *  @param taskId
   */
  pause(taskId: Task['_id']): Promise<void>;
}
