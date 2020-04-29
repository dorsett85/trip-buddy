export const tripInviteStatus = [
  'initiated',
  'notified',
  'accepted',
  'declined'
] as const;

/* eslint-disable camelcase */
export interface TripInviteRecord {
  id: number;
  trip_id: number;
  inviter_id: number;
  invitee_id?: number;
  invitee_email: string;
  status: typeof tripInviteStatus[number];
  created_date: string;
}

export type PartialTripInviteRecord = Partial<TripInviteRecord>;
