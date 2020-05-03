import { UserInputError } from 'apollo-server-express';
import { TripResolvers } from './trip.types';
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE
} from '../../utils/constants/errors';

export const tripResolvers: TripResolvers = {
  Query: {
    trip: async (_, { input }, { tripService }) => {
      const trip = await tripService.findOne(input);
      if (!trip) {
        throw new UserInputError(NOT_FOUND_MESSAGE);
      }
      return trip;
    },
    trips: (_, { input }, { tripService }) => {
      return tripService.findMany(input);
    }
  },
  Mutation: {
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
    }
  }
};
