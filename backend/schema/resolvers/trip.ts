import { UserInputError } from 'apollo-server-express';
import { TripResolvers } from './trip.types';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../../utils/constants/errors';

const Trip: TripResolvers['Trip'] = {
  legs: async ({ id }, __, { TripService }) => {
    const legs = await TripService.findTripLegs({ id });
    return legs;
  }
};

const Query: TripResolvers['Query'] = {
  trips: (_, __, { user, TripService }) => TripService.findByUserId(user.id),
  itinerary: (_, { input }, { TripService }) => TripService.findTripLegItinerary(input)
};

const Mutation: TripResolvers['Mutation'] = {
  createTrip: async (_, { input }, { user, TripService }) => {
    const trip = await TripService.createOne(input, user.id);
    return trip;
  },
  updateTrip: async (_, args, { TripService }) => {
    const {
      input: { id, ...input }
    } = args;
    const trip = await TripService.updateOne(input, { id });
    if (!trip) {
      throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return trip;
  }
};

export const tripResolvers: TripResolvers = {
  Trip,
  Query,
  Mutation
};
