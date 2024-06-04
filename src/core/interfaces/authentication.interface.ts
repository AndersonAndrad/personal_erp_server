import { User } from './user.interface';

export interface DefaultAuthentication extends Pick<User, 'password'> {
  login: string;
  password: string;
}
