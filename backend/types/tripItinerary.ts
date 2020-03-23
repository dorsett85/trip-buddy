/* eslint-disable camelcase */
import { TripItineraryRecord } from 'common/lib/types/tripItinerary';
import { TripRecord } from 'common/lib/types/trip';
import { LngLatArray } from 'common/lib/types/utils';
import { InputResolverArg, OmitCreatedDate, OmitId } from './index';

export type PartialTripItineraryRecord = Partial<TripItineraryRecord>;

export type CreateTripItineraryArgs = {
  trip_id: TripRecord['id'];
  name: TripItineraryRecord['name'];
  description?: TripItineraryRecord['description'];
  location: LngLatArray;
  location_address: TripItineraryRecord['location_address'];
  start_time: TripItineraryRecord['start_time'];
};
export type CreateTripItineraryInput = InputResolverArg<CreateTripItineraryArgs>;

export type UpdateTripItineraryArgs = OmitCreatedDate<
  PartialTripItineraryRecord & { id: TripItineraryRecord['id'] }
>;
export type UpdateTripItineraryOmitIdArgs = OmitId<UpdateTripItineraryArgs>;
export type UpdateTripItineraryInput = InputResolverArg<UpdateTripItineraryArgs>;
