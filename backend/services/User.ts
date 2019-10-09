import bcrypt from 'bcrypt';
import UserModel from '../models/User';
import { LoginArgs, RegisterArgs, UserServiceDeps } from './User.types';

export default class UserService {
  private UserModel: typeof UserModel;

  constructor(dependencies: UserServiceDeps = {}) {
    this.UserModel = dependencies.UserModel || UserModel;
  }

  public async login(args: LoginArgs) {
    const { username, password } = args;

    // check if username or email exists
    const user = await this.UserModel.findOne({ username });
    if (!user) {
      return {};
    }

    // check if password matches
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return {};
    }

    return user;
  }

  public async register(args: RegisterArgs) {
    const user = await this.UserModel.findOne(args);
    return user;
  }
}
