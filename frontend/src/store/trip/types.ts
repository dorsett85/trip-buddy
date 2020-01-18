import { Reducer, Action, ActionCreator } from 'redux';
import { GenericAction, GenericActionCreator } from '../../types/store';
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

export interface ActiveTripInfo {
  id: Trip['id'];
  activeMarker: string;
  updatingLocation: boolean;
  newLocation: LngLatArray | undefined;
  /**
   * This is the index of the itinerary object to be updated
   */
  updatingItineraryLocation: number | undefined;
  newItineraryLocation: LngLatArray | undefined;
  itineraries?: Trip['itineraries'];
}

export interface TripState {
  loadingTrips: boolean;
  trips: {
    [key in Trip['id']]: Trip;
  };
  tripCreator?: TripCreator;
  activeTripInfo?: ActiveTripInfo;
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
  DELETE_TRIP = 'DELETE_TRIP',
  SET_ACTIVE_TRIP_INFO = 'SET_ACTIVE_TRIP_INFO',
  SET_ACTIVE_TRIP_INFO_ITINERARIES = 'SET_ACTIVE_TRIP_INFO_ITINERARIES',
  UPDATE_TRIP_ITINERARY = 'UPDATE_TRIP_ITINERARY'
}

// Action payload args
interface UpdateTripPayload extends Partial<Trip> {
  id: Trip['id'];
}
interface UpdateTripItineraryPayload extends Partial<TripItinerary> {
  index: number;
}

// Actions
export type ResetStateAction = Action<TripActionType.RESET_STATE>;
export type SetLoadingTripsAction = GenericAction<
  TripActionType.SET_LOADING_TRIPS,
  TripState['loadingTrips']
>;
export type SetTripsAction = GenericAction<TripActionType.SET_TRIPS, Trip[]>;
export type SetTripCreatorAction = GenericAction<
  TripActionType.SET_TRIP_CREATOR,
  TripState['tripCreator']
>;
export type AddTripAction = GenericAction<TripActionType.ADD_TRIP, Trip>;
export type UpdateTripAction = GenericAction<
  TripActionType.UPDATE_TRIP,
  UpdateTripPayload
>;
export type DeleteTripAction = GenericAction<TripActionType.DELETE_TRIP, Trip['id']>;
export type SetActiveTripInfoAction = GenericAction<
  TripActionType.SET_ACTIVE_TRIP_INFO,
  Partial<ActiveTripInfo> | undefined
>;
export type SetActiveTripInfoItinerariesAction = GenericAction<
  TripActionType.SET_ACTIVE_TRIP_INFO_ITINERARIES,
  TripItinerary[]
>;
export type UpdateTripItineraryAction = GenericAction<
  TripActionType.UPDATE_TRIP_ITINERARY,
  UpdateTripItineraryPayload
>;
export type TripAction =
  | ResetStateAction
  | SetLoadingTripsAction
  | SetTripsAction
  | SetTripCreatorAction
  | AddTripAction
  | UpdateTripAction
  | DeleteTripAction
  | SetActiveTripInfoAction
  | SetActiveTripInfoItinerariesAction
  | UpdateTripItineraryAction;

// Action creators
export type ResetTripState = ActionCreator<ResetStateAction>;
export type SetLoadingTrips = GenericActionCreator<SetLoadingTripsAction>;
export type SetTrips = GenericActionCreator<SetTripsAction>;
export type SetTripCreator = GenericActionCreator<SetTripCreatorAction>;
export type AddTrip = GenericActionCreator<AddTripAction>;
export type UpdateTrip = GenericActionCreator<UpdateTripAction>;
export type DeleteTrip = GenericActionCreator<DeleteTripAction>;
export type SetActiveTripInfo = GenericActionCreator<SetActiveTripInfoAction>;
export type SetActiveTripInfoItineraries = GenericActionCreator<
  SetActiveTripInfoItinerariesAction
>;
export type UpdateTripItinerary = GenericActionCreator<UpdateTripItineraryAction>;
