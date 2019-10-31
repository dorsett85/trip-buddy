import { TripState, TripActionType, TripReducer } from './types';

const { SET_CREATING_TRIP } = TripActionType;

const initialState: TripState = {
  creatingTrip: false,
  trips: []
};

export const tripReducer: TripReducer = (state = initialState, action) => {
  if (action.type === SET_CREATING_TRIP) {
    return { ...state, creatingTrip: action.payload };
  }

  return state;
};
