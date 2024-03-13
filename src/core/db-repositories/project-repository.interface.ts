import { Project } from '../interfaces/project.interface';
import { PaginatedResponse } from '../interfaces/response.interface';

export interface ProjectRepositoryDb {
  /**
   * @param project
   */
  create(project: Omit<Project, '_id' | 'tasks'>): Promise<void>;

  /**
   * @param projectId
   */
  findOne(projectId: Project['_id']): Promise<Project>;

  /**
   * @TODO implement filter interface
   * @param filter
   */
  findAll(filter: any): Promise<PaginatedResponse<Project>>;

  /**
   * @param project
   * @param projectId
   */
  update(
    projectId: Project['_id'],
    project: Partial<Omit<Project, '_id'>>,
  ): Promise<void>;

  /**
   * @param projectId
   */
  delete(projectId: Project['_id']): Promise<void>;
}
