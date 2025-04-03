interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: Role
}

export enum Role {
  ADMIN = 'Administrator',
  USER = 'User',
}

export default IUser;
