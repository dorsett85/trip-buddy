import { UserRecord } from '../models/UserModel.types';
import TripModel from '../models/TripModel';
import UserTripModel from '../models/UserTripModel';

export interface TripServiceDeps {
  user: UserRecord;
  tripModel: TripModel;
  userTripModel: UserTripModel;
}
