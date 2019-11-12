/* eslint-disable camelcase */
import UserService from '../services/User';
import TripService from '../services/Trip';
import { UserRecord } from '../models/User.types';

export interface ContextDeps {
  UserService: typeof UserService;
  TripService: typeof TripService;
}

export interface ContextObj<TAuth = false> {
  user: TAuth extends false ? null : UserRecord;
  UserService: UserService;
  TripService: TripService;
}
