import UserService from '../services/User';
// eslint-disable-next-line import/no-cycle
import { UserSchema } from './resolvers/user.types';

export interface ContextDeps {
  UserService: typeof UserService;
}

export interface ContextObj {
  UserService: UserService;
  user: UserSchema | null;
}