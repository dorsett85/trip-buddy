import UserModel from '../models/UserModel';

export interface AccessServiceDeps {
  userModel: UserModel;
  jwtSecretKey: string;
}
