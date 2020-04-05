import UserService from '../../services/UserService';
import TripService from '../../services/TripService';
import AccessService from '../../services/AccessService';
import UserModel from '../../models/UserModel';
import UserTripModel from '../../models/UserTripModel';
import TripModel from '../../models/TripModel';
import TripItineraryModel from '../../models/TripItineraryModel';
import TripItineraryService from '../../services/TripItineraryService';
import TripInviteModel from '../../models/TripInviteModel';

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
    TripInviteModel: typeof TripInviteModel;
  };
}
