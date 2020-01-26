import { UserRecord } from 'common/lib/types/user';
// eslint-disable-next-line import/no-cycle
import UserService from '../services/User';
// eslint-disable-next-line import/no-cycle
import TripService from '../services/Trip';

export interface ContextDeps {
  UserService: typeof UserService;
  TripService: typeof TripService;
}

export interface ContextObj<TAuth = false> {
  user: TAuth extends false ? null : UserRecord;
  UserService: UserService;
  TripService: TripService;
}
