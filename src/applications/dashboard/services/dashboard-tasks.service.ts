import { DashboardTaskRepository, DashboardTaskRepositorySymbol } from '@app/core/db-repositories/dashboard-task.interface';
import { Filter, Task } from '@app/core/interfaces/tasks.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DashboardTasksService {
  constructor(@Inject(DashboardTaskRepositorySymbol) private readonly dashboardTaskRepository: DashboardTaskRepository) {}

  async findAll(filter: Filter): Promise<Task[]> {
    return this.dashboardTaskRepository.findAll(filter);
  }
}
