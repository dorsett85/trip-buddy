import { UserInputError } from 'apollo-server-express';
import { TripResolvers } from './trip.types';
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE
} from '../../utils/constants/errors';

const Trip: TripResolvers['Trip'] = {
  itineraries: async ({ id }, __, { TripService }) => {
    const itineraries = await TripService.findTripItinerary({ trip_id: id });
    return itineraries;
  }
};

const Query: TripResolvers['Query'] = {
  trip: async (_, { input }, { user, TripService }) => {
    const trip =
      user.role === 'admin'
        ? await TripService.findOne(input)
        : await TripService.findOneByUserId(user.id, input);
    if (!trip) {
      throw new UserInputError(NOT_FOUND_MESSAGE);
    }
    return trip;
  },
  trips: async (_, { input }, { user, TripService }) => {
    const trips =
      user.role === 'admin'
        ? await TripService.findMany(input)
        : await TripService.findManyByUserId(user.id, input);
    return trips;
  }
};

const Mutation: TripResolvers['Mutation'] = {
  createTrip: async (_, { input }, { user, TripService }) => {
    const trip = await TripService.createOne(input, user.id);
    return trip;
  },
  // TODO Only allow updates to user's trips
  updateTrip: async (_, args, { TripService }) => {
    const {
      input: { id, ...input }
    } = args;
    const trip = await TripService.updateOne(input, { id });
    if (!trip) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return trip;
  },
  deleteTrip: async (_, { id }, { TripService }) => {
    const trip = await TripService.deleteOne(id);
    if (!trip) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return trip.id;
  },
  createTripItinerary: async (_, { input }, { TripService }) => {
    const itinerary = await TripService.createTripItinerary(input);
    if (!itinerary) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return itinerary;
  },
  updateTripItinerary: async (_, { input }, { TripService }) => {
    const { id, ...rest } = input;
    const itinerary = await TripService.updateTripItinerary(rest, { id });
    if (!itinerary) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return itinerary;
  },
  deleteTripItinerary: async (_, { id }, { TripService }) => {
    const itinerary = await TripService.deleteTripItinerary(id);
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
