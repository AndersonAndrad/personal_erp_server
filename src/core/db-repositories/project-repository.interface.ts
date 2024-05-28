import { Filter, Project } from '../interfaces/project.interface';

import { PaginatedResponse } from '../interfaces/response.interface';

export const ProjectRepositorySymbol = Symbol('projectRepositoryDb');

export interface ProjectRepositoryDb {
  /**
   * @param project
   */
  create(project: Omit<Project, '_id' | 'tasks' | 'enabled' | 'hashId'>): Promise<Project>;

  /**
   * @param projectId
   */
  findOne(projectId: Project['_id']): Promise<Project>;

  /**
   * @TODO implement filter interface
   * @param filter
   */
  findAll(filter: Filter): Promise<PaginatedResponse<Project>>;

  /**
   * @param project
   * @param projectId
   */
  update(projectId: Project['_id'], project: Partial<Omit<Project, '_id'>>): Promise<void>;

  /**
   * @param projectId
   */
  delete(projectId: Project['_id']): Promise<void>;
}
