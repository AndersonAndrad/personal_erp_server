import { Role, User } from '@app/core/interfaces/user.interface';

import { UserRepositoryDb } from '@app/core/db-repositories/user-repository.interface';
import { PaginatedResponse } from '@app/core/interfaces/response.interface';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../schemas/user.schema';

export const UserRepositorySymbol = Symbol('UserRepositoryDb');

@Injectable()
export class MongooseUserRepository implements UserRepositoryDb {
  async create(user: Omit<User, '_id'>): Promise<void> {
    await UserModel.create(user);
  }

  async findOne(userId: string): Promise<User> {
    const user = await UserModel.findById(userId);

    return JSON.parse(JSON.stringify(user));
  }

  async findAll(filter: any): Promise<PaginatedResponse<User>> {
    const users = await UserModel.find();

    return {
      items: JSON.parse(JSON.stringify(users)),
      meta: { quantityItems: users.length },
    };
  }

  async update(userId: string, user: Partial<Omit<User, '_id'>>): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { ...user });
  }

  async delete(userId: string): Promise<void> {
    await UserModel.findByIdAndDelete(userId);
  }

  async designateRole(userId: string, role: Role[]): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { $set: role });
  }

  async changeUserAccessStatus(userId: string, blocked: boolean): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { blocked });
  }
}
