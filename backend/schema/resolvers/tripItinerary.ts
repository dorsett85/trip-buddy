import { UserInputError } from 'apollo-server-express';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../../utils/constants/errors';
import { TripItineraryResolvers } from './tripItinerary.types';

export const tripItineraryResolvers: TripItineraryResolvers = {
  Query: {
    tripItineraries: (_, { input }, { tripItineraryService }) => {
      return tripItineraryService.findMany(input);
    }
  },
  Mutation: {
    createTripItinerary: (_, { input }, { tripItineraryService }) => {
      return tripItineraryService.createOne(input);
    },
    updateTripItinerary: async (_, { input }, { tripItineraryService }) => {
      const { id, ...rest } = input;
      const updatedCount = await tripItineraryService.updateOne(rest, { id });
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
  }
};
