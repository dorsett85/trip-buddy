import { UserTripRecord } from './UserTrip.types';
import BaseModel from './Base';

export default class TripModel extends BaseModel {
  public static tableName = 'users_trips';

  public static async createOne(userTrip: UserTripRecord): Promise<UserTripRecord> {
    return this.baseCreateOne(userTrip);
  }
}
