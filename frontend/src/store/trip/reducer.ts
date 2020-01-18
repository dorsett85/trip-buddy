import { TripState, TripReducer } from './types';

const initialState: TripState = {
  loadingTrips: false,
  trips: {},
  itineraries: {},
  tripCreator: undefined,
  activeTripInfo: undefined
};

export const tripReducer: TripReducer = (state = initialState, action): TripState => {
  if (action.type === 'RESET_STATE') {
    return initialState;
  }

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
    const tripCreator: TripState['tripCreator'] = action.payload && {
      ...state.tripCreator,
      ...action.payload
    };
    return { ...state, tripCreator };
  }

  if (action.type === 'ADD_TRIP') {
    const { id } = action.payload;
    const trips: TripState['trips'] = {
      ...state.trips,
      [id]: action.payload
    };
    return { ...state, trips };
  }

  if (action.type === 'UPDATE_TRIP') {
    const { id, ...rest } = action.payload;
    const trips: TripState['trips'] = {
      ...state.trips,
      [id]: { ...state.trips[id], ...rest }
    };

    return { ...state, trips };
  }

  if (action.type === 'DELETE_TRIP') {
    const id = action.payload;
    const trips = { ...state.trips };
    delete trips[id];
    return { ...state, trips };
  }

  if (action.type === 'SET_ACTIVE_TRIP_INFO') {
    const activeTripInfo: TripState['activeTripInfo'] = action.payload && {
      ...state.activeTripInfo!,
      ...action.payload
    };
    return { ...state, activeTripInfo };
  }

  if (action.type === 'SET_TRIP_ITINERARIES') {
    const itineraries: TripState['itineraries'] = {};
    if (action.payload) {
      action.payload.forEach(itinerary => {
        const { id } = itinerary;
        itineraries[id] = itinerary;
      });
    }
    return { ...state, itineraries };
  }

  if (action.type === 'UPDATE_TRIP_ITINERARY') {
    const { id, ...rest } = action.payload;
    const itineraries: TripState['itineraries'] = {
      ...state.itineraries,
      [id]: { ...state.itineraries[id], ...rest }
    };
    return { ...state, itineraries };
  }

  return state;
};
