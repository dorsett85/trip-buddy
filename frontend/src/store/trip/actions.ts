import {
  TripActionType,
  SetTrips,
  SetTripCreator,
  SetLoadingTrips,
  SetActiveTripInfo,
  ResetTripState,
  AddTrip,
  UpdateTrip,
  SetTripItineraries,
  UpdateTripItinerary,
  DeleteTrip,
  SetTripItineraryCreator,
  AddTripItinerary,
  DeleteTripItinerary
} from './types';

export const resetTripState: ResetTripState = () => ({
  type: TripActionType.RESET_STATE
});

export const setLoadingTrips: SetLoadingTrips = payload => ({
  type: TripActionType.SET_LOADING_TRIPS,
  payload
});

export const setTrips: SetTrips = payload => ({
  type: TripActionType.SET_TRIPS,
  payload
});

export const setTripCreator: SetTripCreator = payload => ({
  type: TripActionType.SET_CREATOR,
  payload
});

export const addTrip: AddTrip = payload => ({
  type: TripActionType.ADD_TRIP,
  payload
});

export const updateTrip: UpdateTrip = payload => ({
  type: TripActionType.UPDATE_TRIP,
  payload
});

export const deleteTrip: DeleteTrip = payload => ({
  type: TripActionType.DELETE_TRIP,
  payload
});

export const setActiveTripInfo: SetActiveTripInfo = payload => ({
  type: TripActionType.SET_ACTIVE_TRIP_INFO,
  payload
});

export const setTripItineraries: SetTripItineraries = payload => ({
  type: TripActionType.SET_ITINERARIES,
  payload
});

export const setTripItineraryCreator: SetTripItineraryCreator = payload => ({
  type: TripActionType.SET_ITINERARY_CREATOR,
  payload
});

export const addTripItinerary: AddTripItinerary = payload => ({
  type: TripActionType.ADD_ITINERARY,
  payload
});

export const updateTripItinerary: UpdateTripItinerary = payload => ({
  type: TripActionType.UPDATE_ITINERARY,
  payload
});

export const deleteTripItinerary: DeleteTripItinerary = payload => ({
  type: TripActionType.DELETE_ITINERARY,
  payload
});
