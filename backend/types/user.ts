/* eslint-disable camelcase */
import { UserRecord } from 'common/lib/types/user';
import { TripRecord } from 'common/lib/types/trip';
import { InputResolverArg } from './index';

export type PartialUserRecord = Partial<UserRecord>;

export type CreateUserArgs = Pick<UserRecord, 'username' | 'password' | 'email'>;

export type UpdateUserArgs = Omit<PartialUserRecord, 'id' | 'created_date'>;
export type UpdateUserInput = InputResolverArg<UpdateUserArgs>;

interface CreateTripInvites {
  invitee_id?: UserRecord['id'];
  invitee_email: UserRecord['email'];
  trip_Id: TripRecord['id'];
}
export type CreateTripInvitesArgs = CreateTripInvites[];
export type CreateTripInvitesWithInviterIdArgs = (CreateTripInvites & {
  inviter_id: UserRecord['id'];
})[];
export type CreateTripInvitesInput = InputResolverArg<CreateTripInvitesArgs>;
