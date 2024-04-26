import { DashboardTaskRepositorySymbol } from '@app/core/db-repositories/dashboard-task.interface';
import { MongooseDashboardTaskRepository } from '@app/infra/db/mongoose/repositories/mongoose-dashboard-task.repository';
import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardTasksService } from './services/dashboard-tasks.service';

@Module({
  controllers: [DashboardController],
  providers: [
    DashboardTasksService,
    {
      provide: DashboardTaskRepositorySymbol,
      useClass: MongooseDashboardTaskRepository,
    },
  ],
  imports: [],
})
export class DashboardModule {}
