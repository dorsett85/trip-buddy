/* eslint-disable camelcase */
import { OmitCreatedDate } from '../utils';
import { TripRecord, PartialTripRecord } from '../trip';
import { InputArgs } from './inputArgs';

export type CreateTripArgs = Pick<
  TripRecord,
  'name' | 'description' | 'location' | 'start_date'
>;
export type CreateTripInputArgs = InputArgs<CreateTripArgs>;

export type UpdateTripArgs = OmitCreatedDate<
  PartialTripRecord & { id: TripRecord['id'] }
>;
export type UpdateTripInputArgs = InputArgs<UpdateTripArgs>;
