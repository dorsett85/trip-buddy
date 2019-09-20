import UserModel from '../models/User';
import { LoginArgs, RegisterArgs, UserServiceDeps } from './User.types';

export default class UserService {
  private UserModel: typeof UserModel;

  constructor(dependencies: UserServiceDeps = {}) {
    this.UserModel = dependencies.UserModel || UserModel;
  }

  public async login(args: LoginArgs) {
    const { username, password, email } = args;
    const user = await this.UserModel.findOne({ username });
    return user;
  }

  public register(args: RegisterArgs) {
    const { password, email } = args;
    this.UserModel.findOne({ email })
    return {
      email,
      password
    };
  }
}
