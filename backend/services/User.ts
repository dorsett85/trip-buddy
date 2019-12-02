import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User';
import { UserServiceDeps, UserToken } from './User.types';
import { expressServer } from '../config/config';
import { UserRecord } from '../models/User.types';
// eslint-disable-next-line import/no-cycle
import { LoginArgs, RegisterArgs, UpdateUserInput } from '../schema/resolvers/user.types';
import {
  USER_NOT_FOUND_MESSAGE,
  INVALID_LOGIN_MESSAGE,
  USER_ALREADY_EXISTS_MESSAGE
} from '../utils/constants/errors';
import { OmitProtected } from '../types';

const { jwtSecretKey } = expressServer;

export default class UserService {
  private UserModel: typeof UserModel;

  constructor(dependencies: UserServiceDeps = {}) {
    this.UserModel = dependencies.UserModel || UserModel;
  }

  public static sign(user: UserRecord): string {
    const { id, password } = user;
    return jwt.sign({ id, password }, jwtSecretKey);
  }

  public static verify(token: string): UserToken | null {
    try {
      return jwt.verify(token, jwtSecretKey) as UserToken;
    } catch (err) {
      return null;
    }
  }

  public async login(args: LoginArgs): Promise<string> {
    const { username, password } = args;

    // check if username or email exists
    const user = await this.UserModel.findOne({}, { username, email: username });
    if (!user) {
      return USER_NOT_FOUND_MESSAGE;
    }

    // check if password matches
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return INVALID_LOGIN_MESSAGE;
    }

    return UserService.sign(user);
  }

  public async register(args: RegisterArgs): Promise<string> {
    const { email, password } = args;

    // Check if user exists
    const user = await this.UserModel.findOne({ email });
    if (user) {
      return USER_ALREADY_EXISTS_MESSAGE;
    }

    // Now we can create a new user with hashed password and sign the token
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await this.UserModel.createOne({
      username: email,
      password: hashedPassword,
      email
    });

    return UserService.sign(newUser);
  }

  public findOne(
    andWhereArgs: Partial<UserRecord> = {},
    orWhereArgs: Partial<UserRecord> = {}
  ): Promise<UserRecord | undefined> {
    return this.UserModel.findOne(andWhereArgs, orWhereArgs);
  }

  public updateOne(
    updateUserInput: UpdateUserInput['input'],
    andWhereArgs: Partial<UserRecord> = {},
    orWhereArgs: Partial<UserRecord> = {}
  ): Promise<UserRecord | undefined> {
    return this.UserModel.updateOne(updateUserInput, andWhereArgs, orWhereArgs);
  }
}
