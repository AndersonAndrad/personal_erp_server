export interface User {
  _id: string;
  name: string;
  nickName: string;
  email: string;
  password: string;
  roles: Role[];
  /**
   * @todo in the future implement team interface
   */
  team: any;
  blocked: boolean;
}

export interface Role {
  _id: string;
  name: string;
  permissions: Permission[];
  blocked: boolean;
}

export interface Permission {
  _id: string;
  resource: string;
  action: Action[];
  blocked: boolean;
}

export enum Action {
  CREATE = 'create',
  DELETE = 'delete',
  VIEW = 'view',
  EDIT = 'edit',
}
