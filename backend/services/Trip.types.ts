import { UserRecord } from 'common/lib/types/user';
import TripModel from '../models/Trip';
import UserTripModel from '../models/UserTrip';

export interface TripServiceDeps {
  user: UserRecord;
  TripModel: typeof TripModel;
  UserTripModel: typeof UserTripModel;
}
