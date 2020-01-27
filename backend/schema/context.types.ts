/* eslint-disable import/no-cycle */
import { UserRecord } from 'common/lib/types/user';
import UserService from '../services/User';
import TripService from '../services/Trip';
import AccessService from '../services/Access';
import UserModel from '../models/User';
import UserTripModel from '../models/UserTrip';
import TripModel from '../models/Trip';
import TripItineraryModel from '../models/TripItinerary';

export interface ContextDeps {
  services: {
    AccessService: typeof AccessService;
    UserService: typeof UserService;
    TripService: typeof TripService;
  };
  models: {
    UserModel: typeof UserModel;
    UserTripModel: typeof UserTripModel;
    TripModel: typeof TripModel;
    TripItineraryModel: typeof TripItineraryModel;
  };
}

export interface ContextObj<TAuth = false> {
  user: TAuth extends false ? null : UserRecord;
  accessService: AccessService;
  userService: TAuth extends false ? null : UserService;
  tripService: TAuth extends false ? null : TripService;
}
