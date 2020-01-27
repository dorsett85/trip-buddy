import { UserRecord } from 'common/lib/types/user';
import TripModel from '../models/Trip';
import UserTripModel from '../models/UserTrip';
import TripItineraryModel from '../models/TripItinerary';

export interface TripServiceDeps {
  user: UserRecord;
  TripModel: typeof TripModel;
  TripItineraryModel: typeof TripItineraryModel;
  UserTripModel: typeof UserTripModel;
}
