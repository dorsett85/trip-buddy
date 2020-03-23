import { UserRecord } from 'common/lib/types/user';
import { IAccessService } from '../../services/AccessService.types';
import { ITripService } from '../../services/TripService.types';
import { IUserService } from '../../services/UserService.types';
import { ITripItineraryService } from '../../services/TripItineraryService.types';

export interface ContextObj<TAuth = false> {
  user: TAuth extends false ? null : UserRecord;
  accessService: IAccessService;
  userService: TAuth extends false ? null : IUserService;
  tripService: TAuth extends false ? null : ITripService;
  tripItineraryService: TAuth extends false ? null : ITripItineraryService;
}
