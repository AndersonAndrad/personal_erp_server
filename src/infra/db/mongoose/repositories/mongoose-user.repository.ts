import { CreateUser, Role, User } from '@app/core/interfaces/user.interface';

import { UserRepositoryDb } from '@app/core/db-repositories/user-repository.interface';
import { PaginatedResponse } from '@app/core/interfaces/response.interface';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../schemas/user.schema';

export const UserRepositorySymbol = Symbol('UserRepositoryDb');

@Injectable()
export class MongooseUserRepository implements UserRepositoryDb {
  async findByNickname(nickName: string): Promise<User> {
    const regexNickName: RegExp = new RegExp(nickName, 'i');

    const user = await UserModel.findOne({ nickName: { $regex: regexNickName } });

    if (!user) return undefined;

    return JSON.parse(JSON.stringify(this.deleteSensitiveProperties<User>(user, ['password'])));
  }

  async create(user: CreateUser): Promise<void> {
    await UserModel.create(user);
  }

  async findOne(userId: string): Promise<User> {
    const user = await UserModel.findById(userId);

    return JSON.parse(JSON.stringify(user));
  }

  async findAll(filter: any): Promise<PaginatedResponse<User>> {
    let users = await UserModel.find();

    users = JSON.parse(JSON.stringify(users));

    users = users.map((user) => this.deleteSensitiveProperties(user, ['password']));

    return {
      items: users,
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

  private deleteSensitiveProperties<T>(obj: T, properties: (keyof T)[]): T {
    properties.forEach((property) => delete obj[property]);

    return obj;
  }
}
