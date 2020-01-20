import { Reducer, Action, ActionCreator } from 'redux';
import { GenericAction, GenericActionCreator } from '../utils.types';
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

// Reducer
export type TripReducer = Reducer<TripState, TripAction>;

// Action types
export enum TripActionType {
  RESET_STATE = 'RESET_STATE',
  SET_LOADING_TRIPS = 'SET_LOADING_TRIPS',
  SET_TRIPS = 'SET_TRIPS',
  SET_CREATOR = 'SET_CREATOR',
  ADD_TRIP = 'ADD_TRIP',
  UPDATE_TRIP = 'UPDATE_TRIP',
  DELETE_TRIP = 'DELETE_TRIP',
  SET_ACTIVE_TRIP_INFO = 'SET_ACTIVE_TRIP_INFO',
  SET_ITINERARIES = 'SET_ITINERARIES',
  SET_ITINERARY_CREATOR = 'SET_ITINERARY_CREATOR',
  ADD_ITINERARY = 'ADD_ITINERARY',
  UPDATE_ITINERARY = 'UPDATE_ITINERARY',
  DELETE_ITINERARY = 'DELETE_ITINERARY'
}

// Action payload args
interface UpdateTripPayload extends Partial<Trip> {
  id: Trip['id'];
}
interface UpdateTripItineraryPayload extends Partial<TripItinerary> {
  id: TripItinerary['id'];
}

// Actions
export type ResetTripStateAction = Action<TripActionType.RESET_STATE>;
export type SetLoadingTripsAction = GenericAction<
  TripActionType.SET_LOADING_TRIPS,
  TripState['loadingTrips']
>;
export type SetTripsAction = GenericAction<TripActionType.SET_TRIPS, Trip[]>;
export type SetTripCreatorAction = GenericAction<
  TripActionType.SET_CREATOR,
  TripState['creator']
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
export type SetTripItineraryCreatorAction = GenericAction<
  TripActionType.SET_ITINERARY_CREATOR,
  TripState['itineraryCreator']
>;
export type SetTripItinerariesAction = GenericAction<
  TripActionType.SET_ITINERARIES,
  TripItinerary[] | undefined
>;
export type AddTripItineraryAction = GenericAction<
  TripActionType.ADD_ITINERARY,
  TripItinerary
>;
export type UpdateTripItineraryAction = GenericAction<
  TripActionType.UPDATE_ITINERARY,
  UpdateTripItineraryPayload
>;
export type DeleteTripItineraryAction = GenericAction<
  TripActionType.DELETE_ITINERARY,
  TripItinerary['id']
>;
export type TripAction =
  | ResetTripStateAction
  | SetLoadingTripsAction
  | SetTripsAction
  | SetTripCreatorAction
  | AddTripAction
  | UpdateTripAction
  | DeleteTripAction
  | SetActiveTripInfoAction
  | SetTripItinerariesAction
  | SetTripItineraryCreatorAction
  | AddTripItineraryAction
  | UpdateTripItineraryAction
  | DeleteTripItineraryAction;

// Action creators
export type ResetTripState = ActionCreator<ResetTripStateAction>;
export type SetLoadingTrips = GenericActionCreator<SetLoadingTripsAction>;
export type SetTrips = GenericActionCreator<SetTripsAction>;
export type SetTripCreator = GenericActionCreator<SetTripCreatorAction>;
export type AddTrip = GenericActionCreator<AddTripAction>;
export type UpdateTrip = GenericActionCreator<UpdateTripAction>;
export type DeleteTrip = GenericActionCreator<DeleteTripAction>;
export type SetActiveTripInfo = GenericActionCreator<SetActiveTripInfoAction>;
export type SetTripItineraries = GenericActionCreator<SetTripItinerariesAction>;
export type SetTripItineraryCreator = GenericActionCreator<SetTripItineraryCreatorAction>;
export type AddTripItinerary = GenericActionCreator<AddTripItineraryAction>;
export type UpdateTripItinerary = GenericActionCreator<UpdateTripItineraryAction>;
export type DeleteTripItinerary = GenericActionCreator<DeleteTripItineraryAction>;
