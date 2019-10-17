import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User';
import {
  LoginArgs,
  RegisterArgs,
  UserServiceDeps,
  LoginResponse,
  RegisterResponse
} from './User.types';
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
      return { username };
    }

    const token = this.sign(user);
    return { username, password, token };
  }

  public async register(args: RegisterArgs): Promise<RegisterResponse> {
    const { email } = args;

    // Check if user exists
    const user = await this.UserModel.findOne({ email });
    if (user) {
      return { email };
    }

    // TODO Create new user to db
    const fakeUser = {
      id: 1,
      username: 'user',
      email: 'email',
      password: 'password',
      email_validated: false,
      created: new Date()
    }

    const token = this.sign(fakeUser);
    return { token };
  }
}
