/* eslint-disable camelcase */
import { TripRecord } from '../trip';
import { UserRecord } from '../user';
import { TripInviteRecord } from '../tripInvite';
import { InputArgs } from './inputArgs';

export interface CreateTripInvites {
  invitee_id?: UserRecord['id'];
  invitee_email: UserRecord['email'];
  trip_Id: TripRecord['id'];
}

export type CreateTripInvitesArgs = CreateTripInvites[];
export type CreateTripInvitesInputArgs = InputArgs<CreateTripInvitesArgs>;

export type UpdateTripInviteArgs = Pick<TripInviteRecord, 'id' | 'status'>;
export type UpdateTripInvitesInputArgs = InputArgs<UpdateTripInviteArgs>;
