import UserModel from '../models/User';

export interface AccessServiceDeps {
  UserModel: typeof UserModel;
}
