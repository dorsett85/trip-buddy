import UserModel from '../models/User';
import { LoginArgs, RegisterArgs, UserServiceDeps } from './User.types';

export default class UserService {
  private UserModel: typeof UserModel;

  constructor(dependencies: UserServiceDeps = {}) {
    this.UserModel = dependencies.UserModel || UserModel;
  }

  public async login(args: LoginArgs) {
    const user = await this.UserModel.findOne(args);
    return user;
  }

  public async register(args: RegisterArgs) {
    const user = await this.UserModel.findOne(args);
    return user;
  }
}
