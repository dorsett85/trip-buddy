import UserService from '../services/User';
import TripService from '../services/Trip';
// eslint-disable-next-line import/no-cycle
import { UserSchema } from './resolvers/user.types';

export interface ContextDeps {
  UserService: typeof UserService;
  TripService: typeof TripService;
}

export interface ContextObj {
  user: UserSchema | null;
  UserService: UserService;
  TripService: TripService;
}