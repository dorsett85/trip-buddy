import { Reducer } from 'redux';
import { ActionWithPayload } from '../../types/store';
import { Trip } from '../../types/trip';

// State
export interface TripState {
  creatingTrip: boolean;
  trips: Trip[];
}

// Reducer
export type TripReducer = Reducer<TripState, TripAction>;

// Action types
export enum TripActionType {
  SET_CREATING_TRIP = 'SET_CREATING_TRIP'
}

// Actions
export type SetCreatingTripAction = ActionWithPayload<
  TripActionType.SET_CREATING_TRIP,
  TripState['creatingTrip']
>;
export type TripAction = SetCreatingTripAction;

// Action creators
export type SetCreatingTrip = (
  payload: SetCreatingTripAction['payload']
) => SetCreatingTripAction;
