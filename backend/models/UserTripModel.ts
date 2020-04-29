import BaseModel from './BaseModel';
import { UserTripRecord } from './UserTripModel.types';

export default class UserTripModel extends BaseModel {
  public async createOne(userTrip: UserTripRecord): Promise<UserTripRecord> {
    return this.baseCreateOne(userTrip);
  }
}
