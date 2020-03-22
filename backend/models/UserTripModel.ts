import { UserTripRecord } from 'common/lib/types/userTrip';
import BaseModel from './BaseModel';
import {IUserTripModel} from "./UserTripModel.types";

export default class UserTripModel extends BaseModel implements IUserTripModel{
  public async createOne(userTrip: UserTripRecord): Promise<UserTripRecord> {
    return this.baseCreateOne(userTrip);
  }
}
