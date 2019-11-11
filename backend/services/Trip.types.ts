import TripModel from '../models/Trip';
import UserTripModel from '../models/UserTrip';

export interface TripServiceDeps {
  TripModel?: typeof TripModel;
  UserTripModel?: typeof UserTripModel;
}
