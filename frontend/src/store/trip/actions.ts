import {
  TripActionType,
  SetTrips,
  SetTripCreator,
  SetLoadingTrips,
  SetActiveTrip,
  ResetTripState,
  SetActiveMarker,
  AddTrip,
  UpdateTrip
} from './types';

export const resetTripState: ResetTripState = () => ({
  type: TripActionType.RESET_STATE
});

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

export const addTrip: AddTrip = payload => ({
  type: TripActionType.ADD_TRIP,
  payload
});

export const updateTrip: UpdateTrip = payload => ({
  type: TripActionType.UPDATE_TRIP,
  payload
});

export const setActiveTrip: SetActiveTrip = payload => ({
  type: TripActionType.SET_ACTIVE_TRIP,
  payload
});

export const setActiveMarker: SetActiveMarker = payload => ({
  type: TripActionType.SET_ACTIVE_MARKER,
  payload
});
