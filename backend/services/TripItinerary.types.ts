import { UserRecord } from 'common/lib/types/user';
import { ITripItineraryModel } from '../models/TripItineraryModel.types';

export interface TripItineraryServiceDeps {
  user: UserRecord;
  tripItineraryModel: ITripItineraryModel;
}
