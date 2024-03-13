import { ProjectModel } from '@app/infra/db/mongoose/schemas/project.schema';
import { Injectable } from '@nestjs/common';
import { ProjectRepositoryDb } from '../../../../core/db-repositories/project-repository.interface';
import { Project } from '../../../../core/interfaces/project.interface';
import { PaginatedResponse } from '../../../../core/interfaces/response.interface';

@Injectable()
export class MongooseProjectRepository implements ProjectRepositoryDb {
  async create(project: Omit<Project, '_id' | 'tasks'>): Promise<void> {
    await ProjectModel.create(project);
  }

  async findOne(projectId: string): Promise<Project> {
    const project = await ProjectModel.findById(projectId);

    return JSON.parse(JSON.stringify(project));
  }

  async findAll(filter: any): Promise<PaginatedResponse<Project>> {
    const projects = await ProjectModel.find({});

    return {
      items: JSON.parse(JSON.stringify(projects)),
      meta: {
        quantityItems: projects.length,
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
