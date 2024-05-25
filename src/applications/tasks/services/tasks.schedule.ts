import { Cron, CronExpression } from '@nestjs/schedule';

import { TaskRepositoryDb } from '@app/core/db-repositories/tasks-repository.interface';
import { TaskRepositorySymbol } from '@app/infra/db/mongoose/repositories/mongoose-tasks.repository';
import { getDateToBackup } from '@app/shared/utils/date.utils';
import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TaskSchedule {
  constructor(@Inject(TaskRepositorySymbol) private readonly taskRepostiory: TaskRepositoryDb) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  async backDocuments(): Promise<void> {
    console.log('Running cron job for exporting documents');
    const tasks = await this.taskRepostiory.retrieveAllTasks();

    const exportDir = path.join('/app/exports');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }

    const exportPath = path.join(exportDir, `backup-task-${getDateToBackup()}.json`);
    fs.writeFile(exportPath, JSON.stringify(tasks, null, 2), (error) => {
      if (error) {
        console.error('Error writing file:', error);
        return;
      }

      console.log(`Exported ${tasks.length} documents to ${exportPath}`);
    });
  }
}
