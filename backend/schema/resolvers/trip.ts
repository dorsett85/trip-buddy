import { UserInputError } from 'apollo-server-express';
import { TripResolvers } from './trip.types';
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE
} from '../../utils/constants/errors';

const Trip: TripResolvers['Trip'] = {
  itineraries: ({ id }, __, { tripItineraryService }) => {
    return tripItineraryService.findMany({ items: { trip_id: id } });
  }
};

const TripInvite: TripResolvers['TripInvite'] = {
  trip: async (tripInviteRecord, __, { tripService }) => {
    const trip = await tripService.findOne(
      { items: { id: tripInviteRecord.trip_id } },
      false
    );
    if (!trip) {
      throw new UserInputError(NOT_FOUND_MESSAGE);
    }
    return trip;
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
  trips: (_, { input }, { tripService }) => {
    return tripService.findMany({ items: input });
  },
  tripInvites: (_, __, { tripInviteService }) => tripInviteService.findMany()
};

const Mutation: TripResolvers['Mutation'] = {
  createTrip: (_, { input }, { tripService }) => {
    return tripService.createOne(input);
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
  createTripItinerary: (_, { input }, { tripItineraryService }) => {
    return tripItineraryService.createOne(input);
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
  },
  createTripInvites: (_, { input }, { tripInviteService }) => {
    return tripInviteService.createMany(input);
  }
};

export const tripResolvers: TripResolvers = {
  Trip,
  TripInvite,
  Query,
  Mutation
};
