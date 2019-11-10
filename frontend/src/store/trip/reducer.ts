import { TripState, TripReducer } from './types';

const initialState: TripState = {
  loading: false,
  trips: [],
  createTrip: undefined
};

export const tripReducer: TripReducer = (state = initialState, action): TripState => {
  if (action.type === 'SET_LOADING') {
    return { ...state, loading: action.payload };
  }

  if (action.type === 'SET_TRIPS') {
    return { ...state, trips: action.payload };
  }

  if (action.type === 'SET_CREATE') {
    // If the payload is undefined (e.g., cancel creating trip), don't spread the
    // rest of the createTrip property
    const createTrip = action.payload && { ...state.createTrip, ...action.payload };
    return { ...state, createTrip };
  }

  return state;
};
