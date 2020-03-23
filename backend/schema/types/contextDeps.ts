import UserService from '../../services/User';
import TripService from '../../services/Trip';
import AccessService from '../../services/Access';
import UserModel from '../../models/UserModel';
import UserTripModel from '../../models/UserTripModel';
import TripModel from '../../models/TripModel';
import TripItineraryModel from '../../models/TripItineraryModel';
import TripItineraryService from '../../services/TripItinerary';

export interface ContextDeps {
  services: {
    AccessService: typeof AccessService;
    UserService: typeof UserService;
    TripService: typeof TripService;
    TripItineraryService: typeof TripItineraryService;
  };
  models: {
    UserModel: typeof UserModel;
    UserTripModel: typeof UserTripModel;
    TripModel: typeof TripModel;
    TripItineraryModel: typeof TripItineraryModel;
  };
}
