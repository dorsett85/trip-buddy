import { Reducer, Action, ActionCreator } from 'redux';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ActionWithPayload, GenericActionCreator } from '../../types/store';
import { Trip, TripLeg } from '../../types/trip';

// State
export interface TripCreator {
  openModal?: boolean;
  name?: Trip['name'];
  // eslint-disable-next-line camelcase
  date_time?: MaterialUiPickersDate;
  location?: TripLeg['location'];
}

export interface TripState {
  loadingTrips: boolean;
  trips: {
    [key in Trip['id']]: Trip;
  };
  tripCreator?: TripCreator;
  activeTrip?: Trip;
}

// Reducer
export type TripReducer = Reducer<TripState, TripAction>;

// Action types
export enum TripActionType {
  RESET_STATE = 'RESET_STATE',
  SET_LOADING_TRIPS = 'SET_LOADING_TRIPS',
  SET_TRIPS = 'SET_TRIPS',
  SET_TRIP_CREATOR = 'SET_TRIP_CREATOR',
  SET_ADD_TRIP = 'SET_ADD_TRIP',
  SET_ACTIVE_TRIP = 'SET_ACTIVE_TRIP'
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
export type SetAddTripAction = ActionWithPayload<TripActionType.SET_ADD_TRIP, Trip>;
export type SetActiveTripAction = ActionWithPayload<
  TripActionType.SET_ACTIVE_TRIP,
  TripState['activeTrip']
>;
export type TripAction =
  | ResetStateAction
  | SetLoadingTripsAction
  | SetTripsAction
  | SetTripCreatorAction
  | SetAddTripAction
  | SetActiveTripAction;

// Action creators
export type ResetTripState = ActionCreator<ResetStateAction>;
export type SetLoadingTrips = GenericActionCreator<SetLoadingTripsAction>;
export type SetTrips = GenericActionCreator<SetTripsAction>;
export type SetTripCreator = GenericActionCreator<SetTripCreatorAction>;
export type SetAddTrip = GenericActionCreator<SetAddTripAction>;
export type SetActiveTrip = GenericActionCreator<SetActiveTripAction>;
