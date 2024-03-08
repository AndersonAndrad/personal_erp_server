import { ProjectModel } from '@app/infra/db/mongoose/schemas/manager-project/project.schema';
import { PaginatedResponse } from '@app/modules/shared/response.interface';
import { Injectable } from '@nestjs/common';
import { ProjectRepositoryInteface } from '../interfaces/project-repository.interface';
import { Project } from '../interfaces/project.interface';

@Injectable()
export class ProjectRepository implements ProjectRepositoryInteface {
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
      quantityItems: projects.length,
    };
  }

  async update(
    projectId: string,
    project: Partial<Omit<Project, '_id'>>,
  ): Promise<void> {
    await ProjectModel.updateOne({ _id: projectId }, project);
  }

  async delete(projectId: string): Promise<void> {
    await ProjectModel.deleteOne({ _id: projectId });
  }
}
