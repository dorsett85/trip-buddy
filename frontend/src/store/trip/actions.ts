import { TripActionType, SetTrips, SetCreate, SetLoading } from './types';

export const setLoadingTrips: SetLoading = payload => ({
  type: TripActionType.SET_LOADING,
  payload
});

export const setTrips: SetTrips = payload => ({
  type: TripActionType.SET_TRIPS,
  payload
});

export const setCreateTrip: SetCreate = payload => ({
  type: TripActionType.SET_CREATE,
  payload
});
