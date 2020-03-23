import { UserTripRecord } from 'common/lib/types/userTrip';
import BaseModel from './BaseModel';

export default class UserTripModel extends BaseModel {
  public async createOne(userTrip: UserTripRecord): Promise<UserTripRecord> {
    return this.baseCreateOne(userTrip);
  }
}
