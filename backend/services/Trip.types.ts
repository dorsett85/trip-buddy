import { UserRecord } from 'common/lib/types/user';
import { ITripModel } from '../models/TripModel.types';
import { IUserTripModel } from '../models/UserTripModel.types';

export interface TripServiceDeps {
  user: UserRecord;
  tripModel: ITripModel;
  userTripModel: IUserTripModel;
}
