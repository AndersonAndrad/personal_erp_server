import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillModule } from './applications/bill/bill.module';
import { CategoryModule } from './applications/category/category.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModuleConfiguration } from './infra/db/mongoose/mongoose.module';
import { ProjectModule } from './applications/projects/project.module';
import { TaskModule } from './applications/tasks/tasks.module';

@Module({
  imports: [
    MongooseModuleConfiguration,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'variaveis.ini'],
    }),
    // application modueles
    ProjectModule,
    TaskModule,
    CategoryModule,
    BillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
