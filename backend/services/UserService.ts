import { UserServiceDeps } from './UserService.types';
import UserModel from '../models/UserModel';
import { UpdateUserInput } from "../schema/types/graphql";
import { UserRecord } from "../models/UserModel.types";
import { TripRecord } from "../models/TripModel.types";

export default class UserService {
  private readonly user: UserRecord;

  private userModel: UserModel;

  constructor(dependencies: UserServiceDeps) {
    this.user = dependencies.user;
    this.userModel = dependencies.userModel;
  }

  public async verifyEmail(token: string): Promise<number> {
    return this.userModel.verifyEmail(token, this.user);
  }

  public findOne(): Promise<UserRecord | undefined> {
    const { id } = this.user;
    return this.userModel.findOne({ items: { id } });
  }

  public updateOne(updateUserInput: UpdateUserInput): Promise<number> {
    const { id } = this.user;
    return this.userModel.updateOne(updateUserInput, { items: { id } });
  }

  public possibleTripInvitees(tripId: TripRecord['id']): Promise<UserRecord[]> {
    return this.userModel.findTripInvitees(tripId);
  }
}
