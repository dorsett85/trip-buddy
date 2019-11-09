import { Reducer } from 'redux';
import { ActionWithPayload, GenericActionCreator } from '../../types/store';
import { Trip } from '../../types/trip';

// State
export interface TripState {
  creating: boolean;
  loading: boolean;
  trips: Trip[];
}

// Reducer
export type TripReducer = Reducer<TripState, TripAction>;

// Action types
export enum TripActionType {
  SET_CREATING = 'SET_CREATING',
  SET_LOADING = 'SET_LOADING',
  SET_TRIPS = 'SET_TRIPS'
}

// Actions
export type SetCreatingAction = ActionWithPayload<
  TripActionType.SET_CREATING,
  TripState['creating']
>;
export type SetLoadingAction = ActionWithPayload<
  TripActionType.SET_LOADING,
  TripState['loading']
>;
export type SetTripsAction = ActionWithPayload<
  TripActionType.SET_TRIPS,
  TripState['trips']
>;
export type TripAction = SetCreatingAction | SetLoadingAction | SetTripsAction;

// Action creators
export type SetCreating = GenericActionCreator<SetCreatingAction>;
export type SetLoading = GenericActionCreator<SetLoadingAction>;
export type SetTrips = GenericActionCreator<SetTripsAction>;
