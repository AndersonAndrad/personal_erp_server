import { UserRepositoryDb } from '@app/core/db-repositories/user-repository.interface';
import { UpdateUserDto } from '@app/core/dto/user/update-user.dto';
import { PaginatedResponse } from '@app/core/interfaces/response.interface';
import { CreateUser, Role, User } from '@app/core/interfaces/user.interface';
import { UserSchemaValidator } from '@app/core/schame-validation/user-schema.validation';
import { UserRepositorySymbol } from '@app/infra/db/mongoose/repositories/mongoose-user.repository';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements UserRepositoryDb {
  private salts_rounds: number = Number(process.env.SALTS_ROUNDS);

  constructor(
    @Inject(UserRepositorySymbol) private readonly UserRepository: UserRepositoryDb,
    private readonly userSchemaValidator: UserSchemaValidator,
  ) { }

  async findByLogin(nickName: string): Promise<User> {
    return await this.UserRepository.findByLogin(nickName);
  }

  async create(user: CreateUser): Promise<void> {
    this.userSchemaValidator.createUserValidate(user);

    const alreadyExists = await this.findByLogin(user.nickName);

    if (!!alreadyExists) throw new Error('This nickName already exists');

    user.password = bcrypt.hashSync(`${user.password}/${user.nickName.toLowerCase()}`, this.salts_rounds);

    await this.UserRepository.create(user);
  }

  async findOne(userId: string): Promise<User> {
    return await this.UserRepository.findOne(userId);
  }

  async findAll(filter: any): Promise<PaginatedResponse<User>> {
    return await this.UserRepository.findAll(filter);
  }

  async update(userId: string, user: UpdateUserDto): Promise<void> {
    if ('password' in user && 'confirmPassword' in user) {
      user['password'] = bcrypt.hashSync(`${user.password}/${user['nickName'].toLowerCase()}`, this.salts_rounds);
    } else {
      delete user['password'];
      delete user['confirmPassword'];
    }

    return await this.UserRepository.update(userId, user);
  }

  async delete(userId: string): Promise<void> {
    return await this.UserRepository.delete(userId);
  }

  async designateRole(userId: string, role: Role[]): Promise<void> {
    return await this.UserRepository.designateRole(userId, role);
  }

  async changeUserAccessStatus(userId: string, blocked: boolean): Promise<void> {
    return await this.UserRepository.changeUserAccessStatus(userId, blocked);
  }
}
