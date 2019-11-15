import { TripState, TripReducer } from './types';

const initialState: TripState = {
  loadingTrips: false,
  trips: {},
  tripCreator: undefined
};

export const tripReducer: TripReducer = (state = initialState, action): TripState => {
  if (action.type === 'SET_LOADING_TRIPS') {
    return { ...state, loadingTrips: action.payload };
  }

  if (action.type === 'SET_TRIPS') {
    const trips: TripState['trips'] = {};
    action.payload.forEach(trip => {
      const { id } = trip;
      trips[id] = trip;
    });
    return { ...state, trips };
  }

  if (action.type === 'SET_TRIP_CREATOR') {
    // If the payload is undefined (e.g., cancel creating trip), don't spread the
    // rest of the createTrip property
    const tripCreator = action.payload && { ...state.tripCreator, ...action.payload };
    return { ...state, tripCreator };
  }

  if (action.type === 'SET_ADD_TRIP') {
    const { id } = action.payload;
    const trips: TripState['trips'] = {
      ...state.trips,
      [id]: action.payload
    };
    return { ...state, trips };
  }

  return state;
};
