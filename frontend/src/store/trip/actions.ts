import { SetCreatingTrip, TripActionType } from './types';

export const setCreatingTrip: SetCreatingTrip = payload => ({
  type: TripActionType.SET_CREATING_TRIP,
  payload
});
