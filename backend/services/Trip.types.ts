import TripModel from '../models/Trip';
import UserTripModel from '../models/UserTrip';
import TripLegModel from '../models/TripLeg';

export interface TripServiceDeps {
  TripModel?: typeof TripModel;
  TripLegModel?: typeof TripLegModel;
  UserTripModel?: typeof UserTripModel;
}
