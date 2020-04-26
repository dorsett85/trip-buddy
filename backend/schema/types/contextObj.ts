import { UserRecord } from 'common/lib/types/user';
import { PubSub } from 'apollo-server-express';
import AccessService from '../../services/AccessService';
import TripService from '../../services/TripService';
import UserService from '../../services/UserService';
import TripItineraryService from '../../services/TripItineraryService';
import TripInviteService from '../../services/TripInviteService';

/**
 * Our Apollo context available in our field resolvers. The context will be
 * different depending type TAuth, which indicates if a user has authenticated
 * if true.
 */
export interface ContextObj<TAuth = false> {
  accessService: AccessService;
  user: TAuth extends false ? null : UserRecord;
  pubsub: TAuth extends false ? null : PubSub;
  userService: TAuth extends false ? null : UserService;
  tripService: TAuth extends false ? null : TripService;
  tripItineraryService: TAuth extends false ? null : TripItineraryService;
  tripInviteService: TAuth extends false ? null : TripInviteService;
}
