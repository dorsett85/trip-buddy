/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { TripState, TripSliceCaseReducers } from './types';

const initialState: TripState = {
  loadingTrips: false,
  trips: {},
  itineraries: {},
  creator: undefined,
  itineraryCreator: undefined,
  activeTripInfo: undefined,
  notifications: {
    tripInvites: []
  }
};

const reducers: TripSliceCaseReducers = {
  resetTripState: () => initialState,
  setLoadingTrips: (state, { payload }) => {
    state.loadingTrips = payload;
  },
  setTrips: (state, { payload }) => {
    const trips: TripState['trips'] = {};
    payload.forEach(trip => {
      const { id } = trip;
      trips[id] = trip;
    });
    state.trips = trips;
  },
  setTripCreator: (state, { payload }) => {
    state.creator = payload && {
      ...state.creator,
      ...payload
    };
  },
  addTrip: (state, { payload }) => {
    const { id } = payload;
    state.trips[id] = payload;
  },
  updateTrip: (state, { payload }) => {
    const { id, ...rest } = payload;
    state.trips[id] = { ...state.trips[id], ...rest };
  },
  deleteTrip: (state, { payload }) => {
    delete state.trips[payload];
  },
  setActiveTripInfo: (state, { payload }) => {
    state.activeTripInfo = payload && {
      ...state.activeTripInfo!,
      ...payload
    };
  },
  setTripItineraries: (state, { payload }) => {
    const itineraries: TripState['itineraries'] = {};
    if (payload) {
      payload.forEach(itinerary => {
        const { id } = itinerary;
        itineraries[id] = itinerary;
      });
    }
    state.itineraries = itineraries;
  },
  setTripItineraryCreator: (state, { payload }) => {
    state.itineraryCreator = payload && {
      ...state.itineraryCreator,
      ...payload
    };
  },
  addTripItinerary: (state, { payload }) => {
    const { id } = payload;
    state.itineraries[id] = payload;
  },
  updateTripItinerary: (state, { payload }) => {
    const { id, ...rest } = payload;
    state.itineraries[id] = { ...state.itineraries[id], ...rest };
  },
  deleteTripItinerary: (state, { payload }) => {
    delete state.itineraries[payload];
  },
  setTripInviteNotifications: ({ notifications }, { payload }) => {
    notifications.tripInvites = payload;
  },
  addTripInviteNotification: ({ notifications }, { payload }) => {
    notifications.tripInvites = [...notifications.tripInvites, payload];
  },
  deleteTripInviteNotification: ({ notifications }, { payload }) => {
    notifications.tripInvites = notifications.tripInvites.filter(id => id !== payload);
  }
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers
});

export const {
  resetTripState,
  setLoadingTrips,
  setTrips,
  setTripCreator,
  addTrip,
  updateTrip,
  deleteTrip,
  setActiveTripInfo,
  setTripItineraries,
  setTripItineraryCreator,
  addTripItinerary,
  updateTripItinerary,
  deleteTripItinerary,
  setTripInviteNotifications,
  addTripInviteNotification,
  deleteTripInviteNotification
} = tripSlice.actions;

export const tripReducer = tripSlice.reducer;
