import { PermissionRepositoryDb } from '@app/core/db-repositories/permission-repository.interface';
import { PaginatedResponse } from '@app/core/interfaces/response.interface';
import { Permission } from '@app/core/interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { PermissionModel } from '../schemas/user.schema';

export const PermissionRepositorySymbol = Symbol('PermissionRepositoryDb');

@Injectable()
export class MongoosePermissionRepository implements PermissionRepositoryDb {
  async create(permission: Omit<Permission, '_id'>): Promise<void> {
    await PermissionModel.create(permission);
  }

  async findAll(filter: any): Promise<PaginatedResponse<Permission>> {
    const permissions = await PermissionModel.find();

    return {
      items: JSON.parse(JSON.stringify(permissions)),
      meta: { quantityItems: permissions.length },
    };
  }

  async update(permissionId: string, permission: Partial<Omit<Permission, '_id'>>): Promise<void> {
    await PermissionModel.findByIdAndUpdate(permissionId, permission);
  }

  async delete(permissionId: string): Promise<void> {
    await PermissionModel.findByIdAndDelete(permissionId);
  }

  async changePermissionAccessStatus(permissionId: string, blocked: boolean): Promise<void> {
    await PermissionModel.findByIdAndUpdate(permissionId, { $set: { blocked } });
  }
}
