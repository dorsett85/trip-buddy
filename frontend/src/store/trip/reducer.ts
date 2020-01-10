import { TripState, TripReducer } from './types';

const initialState: TripState = {
  loadingTrips: false,
  trips: {},
  tripCreator: undefined,
  activeTrip: undefined
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
    // If the payload is undefined (e.g., cancel creating trip), don't spread the
    // rest of the createTrip property
    const tripCreator = action.payload && { ...state.tripCreator, ...action.payload };
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
    // When updating a trip, we need to update it on the trip object 
    // and the active trip property
    const trips = { ...state.trips };
    trips[action.payload.id] = action.payload;
    return { ...state, trips, activeTrip: action.payload };
  }

  if (action.type === 'SET_ACTIVE_TRIP') {
    const activeTrip = action.payload ? state.trips[action.payload] : undefined;
    return { ...state, activeTrip };
  }

  if (action.type === 'SET_ACTIVE_TRIP_ITINERARIES') {
    const activeTrip = { ...state.activeTrip!, itineraries: action.payload };
    return { ...state, activeTrip };
  }

  if (action.type === 'SET_ACTIVE_MARKER') {
    const activeTrip = {
      ...state.activeTrip!,
      activeMarker: action.payload
    };
    return { ...state, activeTrip };
  }

  if (action.type === 'UPDATE_TRIP_ITINERARY') {
    const { index, ...rest } = action.payload;

    // Update the trip at the given index
    const itineraries = [...state.activeTrip!.itineraries!];
    itineraries[index] = { ...itineraries[index], ...rest };

    const activeTrip = {
      ...state.activeTrip!,
      itineraries
    }
    return { ...state, activeTrip }
  }

  return state;
};
