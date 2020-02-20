import { UserInputError } from 'apollo-server-express';
import { TripResolvers } from './trip.types';
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE
} from '../../utils/constants/errors';

const Trip: TripResolvers['Trip'] = {
  itineraries: async ({ id }, __, { tripItineraryService }) => {
    const itineraries = await tripItineraryService.findMany({ items: { trip_id: id } });
    return itineraries;
  }
};

const Query: TripResolvers['Query'] = {
  trip: async (_, { input }, { tripService }) => {
    const trip = await tripService.findOne({ items: input });
    if (!trip) {
      throw new UserInputError(NOT_FOUND_MESSAGE);
    }
    return trip;
  },
  trips: async (_, { input }, { tripService }) => {
    return tripService.findMany({ items: input });
  }
};

const Mutation: TripResolvers['Mutation'] = {
  createTrip: async (_, { input }, { tripService }) => {
    const trip = await tripService.createOne(input);
    return trip;
  },
  updateTrip: async (_, { input }, { tripService }) => {
    const { id, ...rest } = input;
    const updatedCount = await tripService.updateOne(rest, { items: { id } });
    if (!updatedCount) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return id;
  },
  deleteTrip: async (_, { id }, { tripService }) => {
    const deletedCount = await tripService.deleteOne(id);
    if (!deletedCount) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return id;
  },
  createTripItinerary: async (_, { input }, { tripItineraryService }) => {
    const itinerary = await tripItineraryService.createOne(input);
    return itinerary;
  },
  updateTripItinerary: async (_, { input }, { tripItineraryService }) => {
    const { id, ...rest } = input;
    const updatedCount = await tripItineraryService.updateOne(rest, { items: { id } });
    if (!updatedCount) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return id;
  },
  deleteTripItinerary: async (_, { id }, { tripItineraryService }) => {
    const deletedCount = await tripItineraryService.deleteOne(id);
    if (!deletedCount) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return id;
  }
};

export const tripResolvers: TripResolvers = {
  Trip,
  Query,
  Mutation
};
