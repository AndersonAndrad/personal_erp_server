import {
  ProjectRepositoryDb,
  ProjectRepositorySymbol,
} from '@app/core/db-repositories/project-repository.interface';
import { Filter, Project } from '@app/core/interfaces/project.interface';
import { PaginatedResponse } from '@app/core/interfaces/response.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(ProjectRepositorySymbol)
    private readonly projectRepository: ProjectRepositoryDb,
  ) {}

  async create(project: Omit<Project, '_id' | 'tasks'>): Promise<Project> {
    return await this.projectRepository.create(project);
  }

  async findOne(projectId: Project['_id']): Promise<Project> {
    return await this.projectRepository.findOne(projectId);
  }

  async findAll(filter?: Filter): Promise<PaginatedResponse<Project>> {
    return await this.projectRepository.findAll(filter);
  }

  async update(
    projectId: Project['_id'],
    project: Partial<Omit<Project, '_id'>>,
  ): Promise<void> {
    await this.projectRepository.update(projectId, project);
  }

  async delete(projectId: Project['_id']): Promise<void> {
    await this.projectRepository.delete(projectId);
  }
}
