/* eslint-disable camelcase */
// eslint-disable-next-line import/no-cycle
import UserService from '../services/User';
// eslint-disable-next-line import/no-cycle
import TripService from '../services/Trip';
import { UserToken } from '../services/User.types';

export interface ContextDeps {
  UserService: typeof UserService;
  TripService: typeof TripService;
}

export interface ContextObj<TAuth = false> {
  user: TAuth extends false ? null : UserToken;
  UserService: UserService;
  TripService: TripService;
}
