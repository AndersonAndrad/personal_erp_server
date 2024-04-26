import { Controller, Get, Query } from '@nestjs/common';

import { FilterDashboardTask } from '@app/core/dto/dashboard/dashboard-task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardTasksService } from './services/dashboard-tasks.service';

@ApiTags('Dashboards')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardTasks: DashboardTasksService) {}

  @Get('/tasks')
  @ApiOperation({ description: 'Retrieve all tasks without pagination based on the applied filters' })
  getTasks(@Query() filter: FilterDashboardTask) {
    return this.dashboardTasks.findAll(filter);
  }
}
