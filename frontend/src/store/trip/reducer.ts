import { TripState, TripReducer } from './types';

const initialState: TripState = {
  loadingTrips: false,
  trips: {},
  itineraries: {},
  creator: undefined,
  itineraryCreator: undefined,
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

  if (action.type === 'SET_CREATOR') {
    const creator: TripState['creator'] = action.payload && {
      ...state.creator,
      ...action.payload
    };
    return { ...state, creator };
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

  if (action.type === 'SET_ITINERARIES') {
    const itineraries: TripState['itineraries'] = {};
    if (action.payload) {
      action.payload.forEach(itinerary => {
        const { id } = itinerary;
        itineraries[id] = itinerary;
      });
    }
    return { ...state, itineraries };
  }

  if (action.type === 'SET_ITINERARY_CREATOR') {
    const itineraryCreator = action.payload && {
      ...state.itineraryCreator,
      ...action.payload
    };

    return { ...state, itineraryCreator };
  }

  if (action.type === 'ADD_ITINERARY') {
    const { id } = action.payload;
    const itineraries: TripState['itineraries'] = {
      ...state.itineraries,
      [id]: action.payload
    };
    return { ...state, itineraries };
  }

  if (action.type === 'UPDATE_ITINERARY') {
    const { id, ...rest } = action.payload;
    const itineraries: TripState['itineraries'] = {
      ...state.itineraries,
      [id]: { ...state.itineraries[id], ...rest }
    };
    return { ...state, itineraries };
  }

  if (action.type === 'DELETE_ITINERARY') {
    const id = action.payload;
    const itineraries = { ...state.itineraries };
    delete itineraries[id];
    return { ...state, itineraries };
  }

  return state;
};
