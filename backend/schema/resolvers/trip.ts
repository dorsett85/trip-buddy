import { TripResolvers } from './trip.types';
import { isAuthenticated } from '../../utils/isAuthenticated';

const Query: TripResolvers['Query'] = {
  trip: isAuthenticated((_, __, { user }) => {
    return { id: 1 };
  }),
  trips: isAuthenticated((_, __, { user }) => {
    return [{ id: 1 }];
  })
};

const Mutation: TripResolvers['Mutation'] = {
  createTrip: isAuthenticated(async (_, { input }, { user, TripService }) => {
    if (!user) {
      return {};
    }
    const trip = await TripService.createOne(input, (user.id as number));
    return trip;
  })
};

export const tripResolvers: TripResolvers = {
  Query,
  Mutation
};
