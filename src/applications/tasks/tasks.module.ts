import { MongooseTaskRepository, TaskRepositorySymbol } from '@app/infra/db/mongoose/repositories/mongoose-tasks.repository';

import { TasksSchemaValidator } from '@app/core/schame-validation/tasks-schema.validation';
import { Module } from '@nestjs/common';
import { TaskService } from './services/tasks.service';
import { TaskController } from './tasks.controller';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    TasksSchemaValidator,
    {
      provide: TaskRepositorySymbol,
      useClass: MongooseTaskRepository,
    },
  ],
})
export class TaskModule {}
