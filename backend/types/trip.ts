/* eslint-disable camelcase */
import { TripRecord } from 'common/lib/types/trip';
import { UserRecord } from 'common/lib/types/user';
import { OmitCreatedDate, OmitIdCreatedDate } from '.';

export type PartialTripRecord = Partial<TripRecord>;

export type CreateTripArgs = Pick<
  TripRecord,
  'name' | 'description' | 'location' | 'start_date'
>;

export type UpdateTripArgs = OmitCreatedDate<
  PartialTripRecord & { id: TripRecord['id'] }
>;

export type UpdateTripOmitIdCreatedDateArgs = OmitIdCreatedDate<PartialTripRecord>;

interface CreateTripInvites {
  invitee_id?: UserRecord['id'];
  invitee_email: UserRecord['email'];
  trip_Id: TripRecord['id'];
}
export type CreateTripInvitesArgs = CreateTripInvites[];
export type CreateTripInvitesWithInviterIdArgs = (CreateTripInvites & {
  inviter_id: UserRecord['id'];
})[];
