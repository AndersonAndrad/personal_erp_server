import { PaginatedResponse } from '../interfaces/response.interface';
import { Role } from '../interfaces/user.interface';

export interface RoleRepositoryDb {
  /**
   * @param role
   */
  create(role: Omit<Role, '_id'>): Promise<void>;

  /**
   * @param filter
   * @todo define filter interface
   */
  findAll(filter: any): Promise<PaginatedResponse<Role>>;

  /**
   * @param roleId
   */
  update(roleId: Role['_id'], role: Partial<Omit<Role, '_id'>>): Promise<void>;

  /**
   * @param roleId
   */
  delete(roleId: Role['_id']): Promise<void>;

  /**
   * @param roleId
   * @param blocked
   */
  changeRoleAccessStatus(roleId: Role['_id'], blocked: boolean): Promise<void>;
}
