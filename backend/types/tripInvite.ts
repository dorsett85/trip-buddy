/* eslint-disable camelcase */
import { TripRecord } from 'common/lib/types/trip';
import { UserRecord } from 'common/lib/types/user';
import { TripInviteRecord } from 'common/lib/types/tripInvite';

export type PartialTripInvitesRecord = Partial<TripInviteRecord>;

interface CreateTripInvites {
  invitee_id?: UserRecord['id'];
  invitee_email: UserRecord['email'];
  trip_Id: TripRecord['id'];
}
export type CreateTripInvitesArgs = CreateTripInvites[];
export type CreateTripInvitesWithInviterIdArgs = (CreateTripInvites & {
  inviter_id: UserRecord['id'];
})[];
