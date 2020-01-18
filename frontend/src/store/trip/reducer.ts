import { TripState, TripReducer } from './types';

const initialState: TripState = {
  loadingTrips: false,
  trips: {},
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

  if (action.type === 'SET_ACTIVE_TRIP_INFO_ITINERARIES') {
    const activeTripInfo: TripState['activeTripInfo'] = {
      ...state.activeTripInfo!,
      itineraries: action.payload
    };
    return { ...state, activeTripInfo };
  }

  if (action.type === 'UPDATE_TRIP_ITINERARY') {
    const { index, ...rest } = action.payload;
    const itineraries = [...state.activeTripInfo!.itineraries];
    itineraries[index] = {
      ...itineraries[index],
      ...rest
    };
    const activeTripInfo: TripState['activeTripInfo'] = {
      ...state.activeTripInfo!,
      itineraries
    };

    return { ...state, activeTripInfo };
  }

  return state;
};
