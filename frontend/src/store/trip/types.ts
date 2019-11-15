import { Reducer } from 'redux';
import { ActionWithPayload, GenericActionCreator } from '../../types/store';
import { Trip } from '../../types/trip';

// State
export interface TripCreator extends Partial<Trip> {
  openModal?: boolean;
}

export interface TripState {
  loadingTrips: boolean;
  trips: {
    [key in Trip['id']]: Trip;
  };
  tripCreator?: TripCreator;
}

// Reducer
export type TripReducer = Reducer<TripState, TripAction>;

// Action types
export enum TripActionType {
  SET_LOADING_TRIPS = 'SET_LOADING_TRIPS',
  SET_TRIPS = 'SET_TRIPS',
  SET_TRIP_CREATOR = 'SET_TRIP_CREATOR',
  SET_ADD_TRIP = 'SET_ADD_TRIP'
}

// Actions
export type SetLoadingTripsAction = ActionWithPayload<
  TripActionType.SET_LOADING_TRIPS,
  TripState['loadingTrips']
>;
export type SetTripsAction = ActionWithPayload<TripActionType.SET_TRIPS, Trip[]>;
export type SetTripCreatorAction = ActionWithPayload<
  TripActionType.SET_TRIP_CREATOR,
  TripState['tripCreator']
>;
export type SetAddTripAction = ActionWithPayload<TripActionType.SET_ADD_TRIP, Trip>;
export type TripAction =
  | SetLoadingTripsAction
  | SetTripsAction
  | SetTripCreatorAction
  | SetAddTripAction;

// Action creators
export type SetLoadingTrips = GenericActionCreator<SetLoadingTripsAction>;
export type SetTrips = GenericActionCreator<SetTripsAction>;
export type SetTripCreator = GenericActionCreator<SetTripCreatorAction>;
export type SetAddTrip = GenericActionCreator<SetAddTripAction>;
