import { TripState, TripReducer } from './types';

const initialState: TripState = {
  creating: false,
  loading: false,
  trips: []
};

export const tripReducer: TripReducer = (state = initialState, action): TripState => {
  if (action.type === 'SET_CREATING') {
    return { ...state, creating: action.payload };
  }

  if (action.type === 'SET_LOADING') {
    return { ...state, loading: action.payload };
  }

  if (action.type === 'SET_TRIPS') {
    return { ...state, trips: action.payload };
  }

  return state;
};
