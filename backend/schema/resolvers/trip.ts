import { UserInputError } from 'apollo-server-express';
import { TripResolvers } from './trip.types';
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE
} from '../../utils/constants/errors';

const Trip: TripResolvers['Trip'] = {
  itineraries: async ({ id }, __, { tripService }) => {
    const itineraries = await tripService.findTripItinerary({ trip_id: id });
    return itineraries;
  }
};

const Query: TripResolvers['Query'] = {
  trip: async (_, { input }, { tripService }) => {
    const trip = await tripService.findOne(input);
    if (!trip) {
      throw new UserInputError(NOT_FOUND_MESSAGE);
    }
    return trip;
  },
  trips: async (_, { input }, { tripService }) => {
    return tripService.findMany(input);
  }
};

const Mutation: TripResolvers['Mutation'] = {
  createTrip: async (_, { input }, { tripService }) => {
    const trip = await tripService.createOne(input);
    return trip;
  },
  // TODO Only allow updates to user's trips
  updateTrip: async (_, args, { tripService }) => {
    const {
      input: { id, ...input }
    } = args;
    const trip = await tripService.updateOne(input, { id });
    if (!trip) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return trip;
  },
  deleteTrip: async (_, { id }, { tripService }) => {
    const trip = await tripService.deleteOne(id);
    if (!trip) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return trip.id;
  },
  createTripItinerary: async (_, { input }, { tripService }) => {
    const itinerary = await tripService.createTripItinerary(input);
    if (!itinerary) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return itinerary;
  },
  updateTripItinerary: async (_, { input }, { tripService }) => {
    const { id, ...rest } = input;
    const itinerary = await tripService.updateTripItinerary(rest, { id });
    if (!itinerary) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return itinerary;
  },
  deleteTripItinerary: async (_, { id }, { tripService }) => {
    const itinerary = await tripService.deleteTripItinerary(id);
    if (!itinerary) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return itinerary.id;
  }
};

export const tripResolvers: TripResolvers = {
  Trip,
  Query,
  Mutation
};
