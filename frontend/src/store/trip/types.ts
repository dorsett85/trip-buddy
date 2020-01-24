import { CaseReducer, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { TripRecord } from 'common/lib/types/trip';
import { TripItineraryRecord } from 'common/lib/types/tripItinerary';
import { LngLatArray } from 'common/lib/types/utils';

// State
export interface TripCreator {
  openModal?: boolean;
  name?: TripRecord['name'];
  description?: TripRecord['description'];
  // eslint-disable-next-line camelcase
  start_date?: string;
  location?: TripRecord['location'];
  // eslint-disable-next-line camelcase
  location_address?: TripRecord['location_address'];
}

export interface TripItineraryCreator {
  // eslint-disable-next-line camelcase
  trip_id?: TripRecord['id'];
  name?: TripItineraryRecord['name'];
  description?: TripItineraryRecord['description'];
  // eslint-disable-next-line camelcase
  start_time?: TripItineraryRecord['start_time'];
  location?: TripItineraryRecord['location'];
  // eslint-disable-next-line camelcase
  location_address?: TripItineraryRecord['location_address'];
}

export interface ActiveTripInfo {
  id: TripRecord['id'];
  activeMarker: string;
  updatingLocation: boolean;
  newLocation: LngLatArray | undefined;
  updatingItineraryLocationId: TripItineraryRecord['id'] | undefined;
  newItineraryLocation: LngLatArray | undefined;
}

export interface TripState {
  loadingTrips: boolean;
  trips: {
    [key in TripRecord['id']]: TripRecord;
  };
  creator?: TripCreator;
  itineraries: {
    [key in TripItineraryRecord['id']]: TripItineraryRecord;
  };
  itineraryCreator?: TripItineraryCreator;
  activeTripInfo?: ActiveTripInfo;
}

// Action payload args
interface UpdateTripPayload extends Partial<TripRecord> {
  id: TripRecord['id'];
}
interface UpdateTripItineraryPayload extends Partial<TripItineraryRecord> {
  id: TripItineraryRecord['id'];
}

// Reducer
type TripCaseReducer<TPayload = void> = CaseReducer<TripState, PayloadAction<TPayload>>;

export interface TripSliceCaseReducers extends SliceCaseReducers<TripState> {
  resetTripState: TripCaseReducer;
  setLoadingTrips: TripCaseReducer<TripState['loadingTrips']>;
  setTrips: TripCaseReducer<TripRecord[]>;
  setTripCreator: TripCaseReducer<TripState['creator']>;
  addTrip: TripCaseReducer<TripRecord>;
  updateTrip: TripCaseReducer<UpdateTripPayload>;
  deleteTrip: TripCaseReducer<TripRecord['id']>;
  setActiveTripInfo: TripCaseReducer<Partial<ActiveTripInfo> | undefined>;
  setTripItineraryCreator: TripCaseReducer<TripState['itineraryCreator']>;
  setTripItineraries: TripCaseReducer<TripItineraryRecord[] | undefined>;
  addTripItinerary: TripCaseReducer<TripItineraryRecord>;
  updateTripItinerary: TripCaseReducer<UpdateTripItineraryPayload>;
  deleteTripItinerary: TripCaseReducer<TripItineraryRecord['id']>;
}
