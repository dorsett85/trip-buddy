import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRecord } from 'common/lib/types/user';
import {
  USER_NOT_FOUND_MESSAGE,
  INVALID_LOGIN_MESSAGE,
  USER_ALREADY_EXISTS_MESSAGE
} from '../utils/constants/errors';
import { AccessServiceDeps, IAccessService } from './Access.types';
import { IUserModel } from '../models/UserModel.types';
import { LoginArgs, RegisterArgs } from '../types/access';

export default class AccessService implements IAccessService {
  private userModel: IUserModel;

  private readonly jwtSecretKey: string;

  public constructor(dependencies: AccessServiceDeps) {
    this.userModel = dependencies.userModel;
    this.jwtSecretKey = dependencies.jwtSecretKey;
  }

  private sign(user: UserRecord): string {
    return jwt.sign(user, this.jwtSecretKey);
  }

  private verify(token: string): UserRecord | null {
    try {
      return jwt.verify(token, this.jwtSecretKey) as UserRecord;
    } catch (err) {
      return null;
    }
  }

  public async getActiveUser(token: string): Promise<UserRecord | null> {
    const user = this.verify(token);
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

    return this.sign(user);
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

    return this.sign(newUser);
  }
}
