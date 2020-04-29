import { CaseReducer, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { LngLatArray } from 'common/lib/types/utils';
import {
  CreateTripInput,
  CreateTripItineraryInput,
  Trip,
  TripInvite,
  TripItinerary
} from '../../api/apollo/graphql';

// State
export interface TripCreator extends Partial<CreateTripInput> {
  openModal?: boolean;
}

export type TripItineraryCreator = Partial<CreateTripItineraryInput>;

export interface ActiveTripInfo {
  id: Trip['id'];
  activeMarker: string;
  updatingLocation: boolean;
  newLocation: LngLatArray | undefined;
  updatingItineraryLocationId: TripItinerary['id'] | undefined;
  newItineraryLocation: LngLatArray | undefined;
}

export interface TripNotifications {
  tripInvites: TripInvite['id'][];
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
  notifications: TripNotifications;
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
  setTripInviteNotifications: TripCaseReducer<TripInvite['id'][]>;
  addTripInviteNotification: TripCaseReducer<TripInvite['id']>;
  deleteTripInviteNotification: TripCaseReducer<TripInvite['id']>;
}
