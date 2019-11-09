import { TripActionType, SetTrips, SetCreating, SetLoading } from './types';

export const setCreatingTrip: SetCreating = payload => ({
  type: TripActionType.SET_CREATING,
  payload
});

export const setLoadingTrips: SetLoading = payload => ({
  type: TripActionType.SET_LOADING,
  payload
});

export const setTrips: SetTrips = payload => ({
  type: TripActionType.SET_TRIPS,
  payload
});
