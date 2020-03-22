import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRecord } from 'common/lib/types/user';
import { expressServer } from '../config/config';
import {
  USER_NOT_FOUND_MESSAGE,
  INVALID_LOGIN_MESSAGE,
  USER_ALREADY_EXISTS_MESSAGE
} from '../utils/constants/errors';
// eslint-disable-next-line import/no-cycle
import { LoginArgs, RegisterArgs } from '../schema/resolvers/user.types';
import { AccessServiceDeps } from './Access.types';
import { IUserModel } from '../models/UserModel.types';

const { jwtSecretKey } = expressServer;

export default class AccessService {
  private userModel: IUserModel;

  public constructor(dependencies: AccessServiceDeps) {
    this.userModel = dependencies.userModel;
  }

  private static sign(user: UserRecord): string {
    return jwt.sign(user, jwtSecretKey);
  }

  private static verify(token: string): UserRecord | null {
    try {
      return jwt.verify(token, jwtSecretKey) as UserRecord;
    } catch (err) {
      return null;
    }
  }

  public async getActiveUser(token: string): Promise<UserRecord | null> {
    const user = AccessService.verify(token);
    return user && ((await this.userModel.findOne({ items: { id: user.id } })) || null);
  }

  public async login(args: LoginArgs): Promise<string> {
    const { username, password } = args;

    // check if username or email exists
    const user = await this.userModel.findOne({
      items: { username, email: username },
      logicalOperator: 'OR'
    });
    if (!user) {
      return USER_NOT_FOUND_MESSAGE;
    }

    // check if password matches
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return INVALID_LOGIN_MESSAGE;
    }

    return AccessService.sign(user);
  }

  public async register(args: RegisterArgs): Promise<string> {
    const { email, password } = args;

    // Check if user exists
    const user = await this.userModel.findOne({ items: { email } });
    if (user) {
      return USER_ALREADY_EXISTS_MESSAGE;
    }

    // Now we can create a new user with hashed password and sign the token
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await this.userModel.createOne({
      username: email,
      password: hashedPassword,
      email
    });

    return AccessService.sign(newUser);
  }
}
