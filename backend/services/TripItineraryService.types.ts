import { UserRecord } from '../models/UserModel.types';
import TripItineraryModel from '../models/TripItineraryModel';

export interface TripItineraryServiceDeps {
  user: UserRecord;
  tripItineraryModel: TripItineraryModel;
}
