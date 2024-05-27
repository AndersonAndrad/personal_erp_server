import { Cron, CronExpression } from '@nestjs/schedule';

import { TaskRepositoryDb } from '@app/core/db-repositories/tasks-repository.interface';
import { TaskRepositorySymbol } from '@app/infra/db/mongoose/repositories/mongoose-tasks.repository';
import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TaskSchedule {
  constructor(@Inject(TaskRepositorySymbol) private readonly taskRepostiory: TaskRepositoryDb) {}

  @Cron(CronExpression.EVERY_HOUR)
  async backDocuments(): Promise<void> {
    console.log('Running cron job for exporting documents');
    const tasks = await this.taskRepostiory.retrieveAllTasks();

    if (!tasks.length) {
      console.log('Does not have any file to save');
      return;
    }

    const exportDir = path.join('/app/exports');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }

    const today = new Date();

    const differenceDay = `${today.getHours()}_${today.getMonth()}-${today.getDay()}-${today.getFullYear()}`;

    const exportPath = path.join(exportDir, `backup-task-${differenceDay}.json`);
    fs.writeFile(exportPath, JSON.stringify(tasks, null, 2), (error) => {
      if (error) {
        console.error('Error writing file:', error);
        return;
      }

      console.log(`Exported ${tasks.length} documents to ${exportPath}`);
    });
  }
}
