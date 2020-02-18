import { UserRecord } from 'common/lib/types/user';
import TripItineraryModel from '../models/TripItinerary';

export interface TripItineraryServiceDeps {
  user: UserRecord;
  TripItineraryModel: typeof TripItineraryModel;
}
