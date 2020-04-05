/* eslint-disable camelcase */
import { TripRecord } from 'common/lib/types/trip';
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
