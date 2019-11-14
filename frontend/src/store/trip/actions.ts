import {
  TripActionType,
  SetTrips,
  SetTripCreator,
  SetLoadingTrips,
  SetAddTrip
} from './types';

export const setLoadingTrips: SetLoadingTrips = payload => ({
  type: TripActionType.SET_LOADING_TRIPS,
  payload
});

export const setTrips: SetTrips = payload => ({
  type: TripActionType.SET_TRIPS,
  payload
});

export const setTripCreator: SetTripCreator = payload => ({
  type: TripActionType.SET_TRIP_CREATOR,
  payload
});

export const setAddTrip: SetAddTrip = payload => ({
  type: TripActionType.SET_ADD_TRIP,
  payload
});
