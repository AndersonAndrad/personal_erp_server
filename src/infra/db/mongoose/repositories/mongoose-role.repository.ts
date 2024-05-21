import { RoleRepositoryDb } from '@app/core/db-repositories/role-repository.interface';
import { PaginatedResponse } from '@app/core/interfaces/response.interface';
import { Role } from '@app/core/interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { RoleModel } from '../schemas/user.schema';

export const RoleRepositorySymbol = Symbol('RoleRepositoryDb');

@Injectable()
export class MongooseRoleRepository implements RoleRepositoryDb {
  async create(role: Omit<Role, '_id'>): Promise<void> {
    await RoleModel.create(role);
  }

  async findAll(filter: any): Promise<PaginatedResponse<Role>> {
    const roles = await RoleModel.find();

    return {
      items: JSON.parse(JSON.stringify(roles)),
      meta: { quantityItems: roles.length },
    };
  }

  async update(roleId: string, role: Partial<Omit<Role, '_id'>>): Promise<void> {
    await RoleModel.findByIdAndUpdate(roleId, role);
  }

  async delete(roleId: string): Promise<void> {
    await RoleModel.findByIdAndDelete(roleId);
  }

  async changeRoleAccessStatus(roleId: string, blocked: boolean): Promise<void> {
    await RoleModel.findByIdAndUpdate(roleId, { $set: { blocked } });
  }
}
