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

  // eslint-disable-next-line class-methods-use-this
  public verify(token: string): UserRecord | null {
    try {
      return jwt.verify(token, jwtSecretKey) as UserRecord;
    } catch (err) {
      return null;
    }
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
    const { email, password } = args;

    // Check if user exists
    const user = await this.UserModel.findOne({ email });
    if (user) {
      return { email };
    }

    // Now we can create a new user and sign the token
    const newUser = await this.UserModel.createOne({ username: email, password, email });
    const token = this.sign(newUser);

    return { token };
  }
}
