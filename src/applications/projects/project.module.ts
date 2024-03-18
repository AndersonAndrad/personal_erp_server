import { ProjectRepositorySymbol } from '@app/core/db-repositories/project-repository.interface';
import { ProjectSchemaValidator } from '@app/core/schame-validation/projects-schema.validation';
import { MongooseProjectRepository } from '@app/infra/db/mongoose/repositories/project.repository';
import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './services/projects.service';

@Module({
  controllers: [ProjectController],
  providers: [
    {
      provide: ProjectRepositorySymbol,
      useClass: MongooseProjectRepository,
    },
    ProjectService,
    ProjectSchemaValidator,
  ],
})
export class ProjectModule {}
