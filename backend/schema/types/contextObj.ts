import { UserRecord } from 'common/lib/types/user';
import AccessService from '../../services/AccessService';
import TripService from '../../services/TripService';
import UserService from '../../services/UserService';
import TripItineraryService from '../../services/TripItineraryService';

export interface ContextObj<TAuth = false> {
  user: TAuth extends false ? null : UserRecord;
  accessService: AccessService;
  userService: TAuth extends false ? null : UserService;
  tripService: TAuth extends false ? null : TripService;
  tripItineraryService: TAuth extends false ? null : TripItineraryService;
}
