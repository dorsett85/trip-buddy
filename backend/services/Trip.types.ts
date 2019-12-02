import TripModel from '../models/Trip';
import UserTripModel from '../models/UserTrip';
import TripLegModel from '../models/TripLeg';
import TripLegItineraryModel from '../models/TripLegItinerary';

export interface TripServiceDeps {
  TripModel?: typeof TripModel;
  TripLegModel?: typeof TripLegModel;
  TripLegItineraryModel?: typeof TripLegItineraryModel;
  UserTripModel?: typeof UserTripModel;
}
