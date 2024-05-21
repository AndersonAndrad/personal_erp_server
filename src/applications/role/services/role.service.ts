import { PermissionRepositoryDb } from '@app/core/db-repositories/permission-repository.interface';
import { RoleRepositoryDb } from '@app/core/db-repositories/role-repository.interface';
import { PaginatedResponse } from '@app/core/interfaces/response.interface';
import { Permission, Role } from '@app/core/interfaces/user.interface';
import { PermissionRepositorySymbol } from '@app/infra/db/mongoose/repositories/mongoose-permission.repository';
import { RoleRepositorySymbol } from '@app/infra/db/mongoose/repositories/mongoose-role.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(
    @Inject(RoleRepositorySymbol) private readonly RoleRepository: RoleRepositoryDb,
    @Inject(PermissionRepositorySymbol) private readonly PermissionRepositoy: PermissionRepositoryDb,
  ) {}

  async createRole(role: Omit<Role, '_id'>): Promise<void> {
    await this.RoleRepository.create(role);
  }

  async findAllRoles(filter: any): Promise<PaginatedResponse<Role>> {
    return await this.RoleRepository.findAll(filter);
  }

  async updateRole(roleId: string, role: Partial<Omit<Role, '_id'>>): Promise<void> {
    await this.RoleRepository.update(roleId, role);
  }

  async deleteRole(roleId: string): Promise<void> {
    await this.RoleRepository.delete(roleId);
  }

  async changeRoleAccessStatus(roleId: string, blocked: boolean): Promise<void> {
    await this.RoleRepository.changeRoleAccessStatus(roleId, blocked);
  }

  async createPermission(permission: Omit<Permission, '_id'>): Promise<void> {
    await this.PermissionRepositoy.create(permission);
  }

  async findAllPermissions(filter: any): Promise<PaginatedResponse<Permission>> {
    return await this.PermissionRepositoy.findAll(filter);
  }

  async updatePermission(permissionId: string, permission: Partial<Omit<Permission, '_id'>>): Promise<void> {
    await this.PermissionRepositoy.update(permissionId, permission);
  }

  async deletePermission(permissionId: string): Promise<void> {
    await this.PermissionRepositoy.delete(permissionId);
  }

  async changePermissionAccessStatus(permissionId: string, blocked: boolean): Promise<void> {
    await this.PermissionRepositoy.changePermissionAccessStatus(permissionId, blocked);
  }
}
