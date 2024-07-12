import { PaginatedResponse } from '../interfaces/response.interface';

interface BaseData {
  _id: string;
}

export interface BasicCrudRepositoryDb<Entity extends BaseData> {
  /**
   * @param entity
   */
  create(entity: Omit<Entity, '_id'>): Promise<void>;

  /**
   * @param filter
   */
  findAll(filter: any): Promise<PaginatedResponse<Entity>>;

  /**
   * @param entityId
   * @param entity
   */
  update(entityId: Entity['_id'], entity: Partial<Omit<Entity, '_id'>>): Promise<void>;

  /**
   * @param entityId
   */
  delete(entityId: Entity['_id']): Promise<void>;
}
