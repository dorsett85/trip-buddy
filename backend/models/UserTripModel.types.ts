import { UserTripRecord } from 'common/lib/types/userTrip';
import { IBaseModel } from './BaseModel.types';

export interface IUserTripModel extends IBaseModel {
  createOne(userTrip: UserTripRecord): Promise<UserTripRecord>;
}
