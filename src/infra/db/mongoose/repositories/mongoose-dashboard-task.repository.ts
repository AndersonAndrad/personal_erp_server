import { Filter, Task } from '@app/core/interfaces/tasks.interface';

import { DashboardTaskRepository } from '@app/core/db-repositories/dashboard-task.interface';
import { getFirstAndLastDayOfMonth } from '@app/shared/utils/date.utils';
import { Injectable } from '@nestjs/common';
import { TasksModel } from '../schemas/tasks.schema';

@Injectable()
export class MongooseDashboardTaskRepository implements DashboardTaskRepository {
  async findAll(filter: Filter): Promise<Task[]> {
    const { firstDay, lastDay } = getFirstAndLastDayOfMonth();

    const query = {};

    const start = new Date(new Date(filter?.start ?? firstDay).setHours(0, 0, 0, 0));

    const finish = new Date(new Date(filter.finish ?? lastDay).setHours(23, 59, 59, 999));

    query['finish'] = { $gte: start, $lt: finish };
    query['project.hashId'] = { $in: filter.hashId };

    const tasks = await TasksModel.find(query);

    return tasks;
  }
}
