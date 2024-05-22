import { Action, Permission, Role, User } from '@app/core/interfaces/user.interface';

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const PermissionSchema = new mongoose.Schema<Permission>({
  resource: { type: String, required: true },
  action: { type: [{ type: String, enum: Object.values(Action) }] },
  blocked: { type: Boolean, default: false },
});

export const RoleSchema = new mongoose.Schema<Role>({
  name: { type: String, required: true },
  permissions: { type: [PermissionSchema] },
  blocked: { type: Boolean, default: false },
});

export const UserSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  userHash: { type: String, default: uuidv4() },
  email: { type: String, required: true },
  nickName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [RoleSchema] },
  blocked: { type: Boolean, default: false },
});

export const UserModel: mongoose.Model<User> = mongoose.model('user', UserSchema);
export const PermissionModel: mongoose.Model<Permission> = mongoose.model('permission', PermissionSchema);
export const RoleModel: mongoose.Model<Role> = mongoose.model('role', RoleSchema);
