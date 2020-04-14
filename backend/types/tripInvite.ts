/* eslint-disable camelcase */
import { TripRecord } from 'common/lib/types/trip';
import { UserRecord } from 'common/lib/types/user';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { OmitId } from './index';

export type PartialTripInviteRecord = Partial<TripInviteRecord>;

interface CreateTripInvites {
  invitee_id?: UserRecord['id'];
  invitee_email: UserRecord['email'];
  trip_Id: TripRecord['id'];
}

export type CreateTripInvitesArgs = CreateTripInvites[];
export type CreateTripInvitesWithInviterIdArgs = (CreateTripInvites & {
  inviter_id: UserRecord['id'];
})[];

export type UpdateTripInviteArgs = Pick<TripInviteRecord, 'id' | 'status'>;

export type UpdateTripInviteOmitIdArgs = OmitId<UpdateTripInviteArgs>;
