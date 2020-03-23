/* eslint-disable camelcase */
import { TripItineraryRecord } from 'common/lib/types/tripItinerary';
import { TripRecord } from 'common/lib/types/trip';
import { LngLatArray } from 'common/lib/types/utils';
import { OmitCreatedDate, OmitIdCreatedDate } from './index';

export type PartialTripItineraryRecord = Partial<TripItineraryRecord>;

export type CreateTripItineraryArgs = {
  trip_id: TripRecord['id'];
  name: TripItineraryRecord['name'];
  description?: TripItineraryRecord['description'];
  location: LngLatArray;
  location_address: TripItineraryRecord['location_address'];
  start_time: TripItineraryRecord['start_time'];
};

export type UpdateTripItineraryArgs = OmitCreatedDate<
  PartialTripItineraryRecord & { id: TripItineraryRecord['id'] }
>;

export type UpdateTripItineraryOmitIdCreatedDateArgs = OmitIdCreatedDate<
  PartialTripItineraryRecord
>;
