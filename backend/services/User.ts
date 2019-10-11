import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User';
import { LoginArgs, RegisterArgs, UserServiceDeps, JWTSignArgs } from './User.types';
import { expressServer } from '../config/config';

const { jwtSecretKey } = expressServer;

export default class UserService {
  private UserModel: typeof UserModel;

  constructor(dependencies: UserServiceDeps = {}) {
    this.UserModel = dependencies.UserModel || UserModel;
  }

  // eslint-disable-next-line class-methods-use-this
  public sign(args: JWTSignArgs) {
    return jwt.sign(args, jwtSecretKey);
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
      return { id: user.id };
    }

    // sign token
    const token = this.sign({ id: user.id, username });

    return { user, token };
  }

  public async register(args: RegisterArgs) {
    const user = await this.UserModel.findOne(args);
    return user;
  }
}
