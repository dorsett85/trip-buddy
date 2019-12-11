import { Reducer, Action, ActionCreator } from 'redux';
import { ActionWithPayload, GenericActionCreator } from '../../types/store';
import { Trip, TripItinerary } from '../../types/trip';

// State
export interface TripCreator {
  openModal?: boolean;
  name?: Trip['name'];
  description?: Trip['description'];
  // eslint-disable-next-line camelcase
  start_date?: string;
  location?: Trip['location'];
}

export interface ActiveTrip extends Trip {
  activeMarker?: number;
}

export interface TripState {
  loadingTrips: boolean;
  trips: {
    [key in Trip['id']]: Trip;
  };
  tripCreator?: TripCreator;
  activeTrip?: ActiveTrip;
}

// Reducer
export type TripReducer = Reducer<TripState, TripAction>;

// Action types
export enum TripActionType {
  RESET_STATE = 'RESET_STATE',
  SET_LOADING_TRIPS = 'SET_LOADING_TRIPS',
  SET_TRIPS = 'SET_TRIPS',
  SET_TRIP_CREATOR = 'SET_TRIP_CREATOR',
  ADD_TRIP = 'ADD_TRIP',
  UPDATE_TRIP = 'UPDATE_TRIP',
  SET_ACTIVE_TRIP = 'SET_ACTIVE_TRIP',
  SET_ACTIVE_TRIP_ITINERARIES = 'SET_ACTIVE_TRIP_ITINERARIES',
  SET_ACTIVE_MARKER = 'SET_ACTIVE_MARKER'
}

// Actions
export type ResetStateAction = Action<TripActionType.RESET_STATE>;
export type SetLoadingTripsAction = ActionWithPayload<
  TripActionType.SET_LOADING_TRIPS,
  TripState['loadingTrips']
>;
export type SetTripsAction = ActionWithPayload<TripActionType.SET_TRIPS, Trip[]>;
export type SetTripCreatorAction = ActionWithPayload<
  TripActionType.SET_TRIP_CREATOR,
  TripState['tripCreator']
>;
export type AddTripAction = ActionWithPayload<TripActionType.ADD_TRIP, Trip>;
export type UpdateTripAction = ActionWithPayload<TripActionType.UPDATE_TRIP, Trip>;
export type SetActiveTripAction = ActionWithPayload<
  TripActionType.SET_ACTIVE_TRIP,
  Trip['id'] | undefined
>;
export type SetActiveTripItinerariesAction = ActionWithPayload<
  TripActionType.SET_ACTIVE_TRIP_ITINERARIES,
  TripItinerary[]
>;
export type SetActiveMarkerAction = ActionWithPayload<
  TripActionType.SET_ACTIVE_MARKER,
  ActiveTrip['activeMarker'] | undefined
>;
export type TripAction =
  | ResetStateAction
  | SetLoadingTripsAction
  | SetTripsAction
  | SetTripCreatorAction
  | AddTripAction
  | UpdateTripAction
  | SetActiveTripAction
  | SetActiveTripItinerariesAction
  | SetActiveMarkerAction;

// Action creators
export type ResetTripState = ActionCreator<ResetStateAction>;
export type SetLoadingTrips = GenericActionCreator<SetLoadingTripsAction>;
export type SetTrips = GenericActionCreator<SetTripsAction>;
export type SetTripCreator = GenericActionCreator<SetTripCreatorAction>;
export type AddTrip = GenericActionCreator<AddTripAction>;
export type UpdateTrip = GenericActionCreator<UpdateTripAction>;
export type SetActiveTrip = GenericActionCreator<SetActiveTripAction>;
export type SetActiveTripItineraries = GenericActionCreator<
  SetActiveTripItinerariesAction
>;
export type SetActiveMarker = GenericActionCreator<SetActiveMarkerAction>;
