import { Reducer } from 'redux';
import { ActionWithPayload, GenericActionCreator } from '../../types/store';
import { Trip } from '../../types/trip';

// State
export interface CreateTrip extends Trip {
  openModal?: boolean;
}

export interface TripState {
  loading: boolean;
  trips: Trip[];
  createTrip?: CreateTrip;
}

// Reducer
export type TripReducer = Reducer<TripState, TripAction>;

// Action types
export enum TripActionType {
  SET_LOADING = 'SET_LOADING',
  SET_TRIPS = 'SET_TRIPS',
  SET_CREATE = 'SET_CREATE'
}

// Actions
export type SetLoadingAction = ActionWithPayload<
  TripActionType.SET_LOADING,
  TripState['loading']
>;
export type SetTripsAction = ActionWithPayload<
  TripActionType.SET_TRIPS,
  TripState['trips']
>;
export type SetCreateAction = ActionWithPayload<
  TripActionType.SET_CREATE,
  TripState['createTrip']
>;
export type TripAction = SetLoadingAction | SetTripsAction | SetCreateAction;

// Action creators
export type SetLoading = GenericActionCreator<SetLoadingAction>;
export type SetTrips = GenericActionCreator<SetTripsAction>;
export type SetCreate = GenericActionCreator<SetCreateAction>;
