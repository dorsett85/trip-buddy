import UserService from '../services/User';

export interface ContextDeps {
  UserService: typeof UserService;
}

export interface ContextObj {
  UserService: UserService
}