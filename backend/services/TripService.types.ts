import { UserRecord } from 'common/lib/types/user';
import TripModel from '../models/TripModel';
import UserTripModel from '../models/UserTripModel';

export interface TripServiceDeps {
  user: UserRecord;
  tripModel: TripModel;
  userTripModel: UserTripModel;
}
