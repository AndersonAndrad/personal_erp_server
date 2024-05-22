import { Role, User } from '../interfaces/user.interface';

import { PaginatedResponse } from '../interfaces/response.interface';

export interface UserRepositoryDb {
  /**
   * @param user
   */
  create(user: Omit<User, '_id' | 'team' | 'userHash'>): Promise<void>;

  /**
   * @param userId
   */
  findOne(userId: User['_id']): Promise<User>;

  /**
   * @param filter
   */
  findAll(filter: any): Promise<PaginatedResponse<User>>;

  /**
   * @param user
   */
  update(userId: User['_id'], user: Partial<Omit<User, '_id'>>): Promise<void>;

  /**
   * @param userId
   */
  delete(userId: User['_id']): Promise<void>;

  /**
   * @param userId
   * @param role
   */
  designateRole(userId: User['_id'], role: Role[]): Promise<void>;

  /**
   * @param userId
   * @param blocked
   */
  changeUserAccessStatus(userId: User['_id'], blocked: boolean): Promise<void>;
}
