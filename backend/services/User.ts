import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User';
import { LoginArgs, RegisterArgs, UserServiceDeps, LoginResponse, RegisterResponse } from './User.types';
import { expressServer } from '../config/config';
import { UserRecord } from '../models/User.types';

const { jwtSecretKey } = expressServer;

export default class UserService {
  private UserModel: typeof UserModel;

  constructor(dependencies: UserServiceDeps = {}) {
    this.UserModel = dependencies.UserModel || UserModel;
  }

  // eslint-disable-next-line class-methods-use-this
  public sign(user: UserRecord) {
    return jwt.sign(user, jwtSecretKey);
  }

  public async login(args: LoginArgs): Promise<LoginResponse> {
    const { username, password } = args;

    // check if username or email exists
    const user = await this.UserModel.findOne({}, { username, email: username });
    if (!user) {
      return {};
    }

    // check if password matches
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return { id: user.id };
    }

    const token = this.sign(user);
    return { token };
  }

  public async register(args: RegisterArgs): Promise<RegisterResponse> {
    const user = await this.UserModel.findOne(args);

    // Check if user exists
    if (user) {
      return { id: user.id };
    }

    // TODO Create a user

    const token = this.sign(user);
    return { token };
  }
}
