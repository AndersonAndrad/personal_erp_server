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

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async backDocuments(): Promise<void> {
    console.log('Running cron job for exporting documents');
    const tasks = await this.taskRepostiory.retrieveAllTasks();

    const exportDir = path.join('/app/exports');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }

    const exportPath = path.join(exportDir, `export-task-${getDateToBackup()}.json`);
    fs.writeFile(exportPath, JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }

      console.log(`Exported ${tasks.length} documents to ${exportPath}`);
    });
  }
}
