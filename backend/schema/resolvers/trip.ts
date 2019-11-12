import { TripResolvers } from './trip.types';

const Query: TripResolvers['Query'] = {
  trip: async (_, __, { user }) => {
    return { id: 1 };
  },
  trips: (_, __, { user, TripService }) => {
    return TripService.getByUserId(user.id);
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
