import { UserRecord } from 'common/lib/types/user';
import TripModel from '../models/TripModel';
import UserTripModel from '../models/UserTripModel';
import TripInviteModel from '../models/TripInviteModel';

export interface TripServiceDeps {
  user: UserRecord;
  tripModel: TripModel;
  userTripModel: UserTripModel;
  tripInviteModel: TripInviteModel;
}
