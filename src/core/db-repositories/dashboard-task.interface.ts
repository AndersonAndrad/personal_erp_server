import { Filter, Task } from '../interfaces/tasks.interface';

export const DashboardTaskRepositorySymbol = Symbol('dashboardTaskRepositorySymbol');
export interface DashboardTaskRepository {
  /**
   * @param filter
   */
  findAll(filter: Filter): Promise<Task[]>;
}
