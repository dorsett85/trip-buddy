import { UserRecord } from 'common/lib/types/user';
import UserService from '../../services/User';
import TripService from '../../services/Trip';
import TripItineraryService from '../../services/TripItinerary';
import { IAccessService } from '../../services/Access.types';

export interface ContextObj<TAuth = false> {
  user: TAuth extends false ? null : UserRecord;
  accessService: IAccessService;
  userService: TAuth extends false ? null : UserService;
  tripService: TAuth extends false ? null : TripService;
  tripItineraryService: TAuth extends false ? null : TripItineraryService;
}
