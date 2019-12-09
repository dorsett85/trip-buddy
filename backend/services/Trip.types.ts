import TripModel from '../models/Trip';
import UserTripModel from '../models/UserTrip';
import TripItineraryModel from '../models/TripItinerary';

export interface TripServiceDeps {
  TripModel?: typeof TripModel;
  TripItineraryModel?: typeof TripItineraryModel;
  UserTripModel?: typeof UserTripModel;
}
