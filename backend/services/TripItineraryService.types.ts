import { UserRecord } from 'common/lib/types/user';
import TripItineraryModel from '../models/TripItineraryModel';

export interface TripItineraryServiceDeps {
  user: UserRecord;
  tripItineraryModel: TripItineraryModel;
}
