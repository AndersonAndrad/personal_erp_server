import { Filter, Project } from '../../../../core/interfaces/project.interface';

import { ProjectModel } from '@app/infra/db/mongoose/schemas/project.schema';
import { Injectable } from '@nestjs/common';
import { ProjectRepositoryDb } from '../../../../core/db-repositories/project-repository.interface';
import { PaginatedResponse } from '../../../../core/interfaces/response.interface';

@Injectable()
export class MongooseProjectRepository implements ProjectRepositoryDb {
  async create(project: Omit<Project, '_id' | 'tasks'>): Promise<Project> {
    const projectCreated = await ProjectModel.create(project);

    return JSON.parse(JSON.stringify(projectCreated));
  }

  async findOne(projectId: string): Promise<Project> {
    const project = await ProjectModel.findById(projectId);

    return JSON.parse(JSON.stringify(project));
  }

  async findAll(filter: Filter): Promise<PaginatedResponse<Project>> {
    let projects = [];
    let totalCount: number = 0;

    if ('page' in filter && 'size' in filter) {
      projects = (await ProjectModel.find({})) ?? [];
    } else {
      projects = (await ProjectModel.find({})) ?? [];
      totalCount = projects.length;
    }

    return {
      items: JSON.parse(JSON.stringify(projects)),
      meta: {
        quantityItems: totalCount,
      },
    };
  }

  async update(
    projectId: Project['_id'],
    project: Partial<Omit<Project, '_id'>>,
  ): Promise<void> {
    await ProjectModel.updateOne({ _id: projectId }, project);
  }

  async delete(projectId: Project['_id']): Promise<void> {
    await ProjectModel.deleteOne({ _id: projectId });
  }
}
