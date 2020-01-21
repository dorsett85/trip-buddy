import { CaseReducer, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { Trip, TripItinerary } from '../../types/trip';
import { LngLatArray } from '../../types/shared';

// State
export interface TripCreator {
  openModal?: boolean;
  name?: Trip['name'];
  description?: Trip['description'];
  // eslint-disable-next-line camelcase
  start_date?: string;
  location?: Trip['location'];
  // eslint-disable-next-line camelcase
  location_address?: Trip['location_address'];
}

export interface TripItineraryCreator {
  // eslint-disable-next-line camelcase
  trip_id?: Trip['id'];
  name?: TripItinerary['name'];
  description?: TripItinerary['description'];
  // eslint-disable-next-line camelcase
  start_time?: TripItinerary['start_time'];
  location?: TripItinerary['location'];
  // eslint-disable-next-line camelcase
  location_address?: TripItinerary['location_address'];
}

export interface ActiveTripInfo {
  id: Trip['id'];
  activeMarker: string;
  updatingLocation: boolean;
  newLocation: LngLatArray | undefined;
  updatingItineraryLocationId: TripItinerary['id'] | undefined;
  newItineraryLocation: LngLatArray | undefined;
}

export interface TripState {
  loadingTrips: boolean;
  trips: {
    [key in Trip['id']]: Trip;
  };
  creator?: TripCreator;
  itineraries: {
    [key in TripItinerary['id']]: TripItinerary;
  };
  itineraryCreator?: TripItineraryCreator;
  activeTripInfo?: ActiveTripInfo;
}

// Action payload args
interface UpdateTripPayload extends Partial<Trip> {
  id: Trip['id'];
}
interface UpdateTripItineraryPayload extends Partial<TripItinerary> {
  id: TripItinerary['id'];
}

// Reducer
type TripCaseReducer<TPayload = void> = CaseReducer<TripState, PayloadAction<TPayload>>;

export interface TripSliceCaseReducers extends SliceCaseReducers<TripState> {
  resetTripState: TripCaseReducer;
  setLoadingTrips: TripCaseReducer<TripState['loadingTrips']>;
  setTrips: TripCaseReducer<Trip[]>;
  setTripCreator: TripCaseReducer<TripState['creator']>;
  addTrip: TripCaseReducer<Trip>;
  updateTrip: TripCaseReducer<UpdateTripPayload>;
  deleteTrip: TripCaseReducer<Trip['id']>;
  setActiveTripInfo: TripCaseReducer<Partial<ActiveTripInfo> | undefined>;
  setTripItineraryCreator: TripCaseReducer<TripState['itineraryCreator']>;
  setTripItineraries: TripCaseReducer<TripItinerary[] | undefined>;
  addTripItinerary: TripCaseReducer<TripItinerary>;
  updateTripItinerary: TripCaseReducer<UpdateTripItineraryPayload>;
  deleteTripItinerary: TripCaseReducer<TripItinerary['id']>;
}
