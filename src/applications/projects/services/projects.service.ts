import { ProjectRepositoryDb, ProjectRepositorySymbol } from '@app/core/db-repositories/project-repository.interface';
import { Filter, Project } from '@app/core/interfaces/project.interface';
import { PaginatedResponse } from '@app/core/interfaces/response.interface';
import { ProjectSchemaValidator } from '@app/core/schame-validation/projects-schema.validation';
import { convertToCents } from '@app/shared/utils/currency.utils';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(ProjectRepositorySymbol)
    private readonly projectRepository: ProjectRepositoryDb,
    private readonly projectSchemaValidator: ProjectSchemaValidator,
  ) {}

  async create(project: Omit<Project, '_id' | 'tasks' | 'enabled'>): Promise<Project> {
    this.projectSchemaValidator.createProjectValidate(project);

    return await this.projectRepository.create({
      ...project,
      hoursPrice: convertToCents(project.hoursPrice),
    });
  }

  async findOne(projectId: Project['_id']): Promise<Project> {
    this.projectSchemaValidator.idProjectValidate(projectId);

    console.log('passed');

    return await this.projectRepository.findOne(projectId);
  }

  async findAll(filter?: Filter): Promise<PaginatedResponse<Project>> {
    return await this.projectRepository.findAll(filter);
  }

  async update(projectId: Project['_id'], project: Partial<Omit<Project, '_id'>>): Promise<void> {
    this.projectSchemaValidator.updateProjectValidate({
      _id: projectId,
      ...project,
    });

    if ('hoursPrice' in project) {
      project = { ...project, hoursPrice: convertToCents(project.hoursPrice) };
    }

    await this.projectRepository.update(projectId, project);
  }

  async delete(projectId: Project['_id']): Promise<void> {
    this.projectSchemaValidator.idProjectValidate(projectId);

    await this.projectRepository.delete(projectId);
  }
}
