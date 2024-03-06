import { Module } from '@nestjs/common';
import { ProjectService } from './services/project.service';

@Module({
  imports: [],
  providers: [ProjectService],
  controllers: [],
})
export class ProjectModule {}
