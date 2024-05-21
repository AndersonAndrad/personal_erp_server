import { PaginatedResponse } from '../interfaces/response.interface';
import { Permission } from '../interfaces/user.interface';

export interface PermissionRepositoryDb {
  /**
   * @param permission
   */
  create(permission: Omit<Permission, '_id'>): Promise<void>;

  /**
   * @param filter
   * @todo define filter interface
   */
  findAll(filter: any): Promise<PaginatedResponse<Permission>>;

  /**
   * @param permissionId
   */
  update(permissionId: Permission['_id'], permission: Partial<Omit<Permission, '_id'>>): Promise<void>;

  /**
   * @param permissionId
   */
  delete(permissionId: Permission['_id']): Promise<void>;

  /**
   * @param roleId
   * @param blocked
   */
  changePermissionAccessStatus(permissionId: Permission['_id'], blocked: boolean): Promise<void>;
}
