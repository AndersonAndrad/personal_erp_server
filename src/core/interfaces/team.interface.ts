import { User } from './user.interface';

export interface Team {
  _id: string;
  name: string;
  members: User[];
}
