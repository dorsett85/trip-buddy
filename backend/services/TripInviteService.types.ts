import { PubSub } from 'apollo-server-express';
import { UserRecord } from '../models/UserModel.types';
import TripInviteModel from '../models/TripInviteModel';

export interface TripInviteServiceDeps {
  user: UserRecord;
  pubsub: PubSub;
  tripInviteModel: TripInviteModel;
}
