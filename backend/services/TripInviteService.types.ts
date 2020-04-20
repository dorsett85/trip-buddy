import { UserRecord } from 'common/lib/types/user';
import { PubSub } from 'apollo-server-express';
import TripInviteModel from '../models/TripInviteModel';

export interface TripInviteServiceDeps {
  user: UserRecord;
  pubsub: PubSub;
  tripInviteModel: TripInviteModel;
}
