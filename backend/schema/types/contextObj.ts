/* eslint-disable import/no-cycle */
import { UserRecord } from 'common/lib/types/user';
import UserService from '../../services/User';
import TripService from '../../services/Trip';
import AccessService from '../../services/Access';
import TripItineraryService from '../../services/TripItinerary';

export interface ContextObj<TAuth = false> {
  user: TAuth extends false ? null : UserRecord;
  accessService: AccessService;
  userService: TAuth extends false ? null : UserService;
  tripService: TAuth extends false ? null : TripService;
  tripItineraryService: TAuth extends false ? null : TripItineraryService;
}
