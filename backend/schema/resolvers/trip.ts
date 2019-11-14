import { TripResolvers } from './trip.types';

const Query: TripResolvers['Query'] = {
  trip: async (_, __, { user }) => {
    return { id: 1 };
  },
  trips: async (_, __, { user, TripService }) => {
    return [{ id: 1}];
  }
};

const Mutation: TripResolvers['Mutation'] = {
  createTrip: async (_, { input }, { user, TripService }) => {
    const trip = await TripService.createOne(input, user.id);
    return trip;
  }
};

export const tripResolvers: TripResolvers = {
  Query,
  Mutation
};
