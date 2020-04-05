import { UserRecord } from 'common/lib/types/user';
import TripInviteModel from '../models/TripInviteModel';

export interface TripInviteServiceTypes {
  user: UserRecord;
  tripInviteModel: TripInviteModel;
}
