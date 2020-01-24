import { UserTripRecord } from 'common/lib/types/userTrip';
import BaseModel from './Base';

export default class UserTripModel extends BaseModel {
  public static tableName = 'users_trips';

  public static async createOne(userTrip: UserTripRecord): Promise<UserTripRecord> {
    return this.baseCreateOne(userTrip);
  }
}
