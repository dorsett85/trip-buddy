/* eslint-disable camelcase */
export interface UserTripRecord {
  user_id: number;
  trip_id: number;
}

export type PartialUserTripRecord = Partial<UserTripRecord>;
