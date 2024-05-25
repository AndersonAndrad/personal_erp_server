import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillModule } from './applications/bill/bill.module';
import { CategoryModule } from './applications/category/category.module';
import { DashboardModule } from './applications/dashboard/dashboard.module';
import { ProjectModule } from './applications/projects/project.module';
import { TaskModule } from './applications/tasks/tasks.module';
import { UserModule } from './applications/user/user.module';
import { MongooseModuleConfiguration } from './infra/db/mongoose/mongoose.module';

@Module({
  imports: [
    MongooseModuleConfiguration,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'variaveis.ini'],
    }),
    ScheduleModule.forRoot(),
    // application modules
    ProjectModule,
    TaskModule,
    CategoryModule,
    BillModule,
    DashboardModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
