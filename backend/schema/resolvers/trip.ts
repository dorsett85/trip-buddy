import { TripResolvers } from './trip.types';

const Query: TripResolvers['Query'] = {
  trip: (_, __, { user }) => {
    if (!user) {
      return {};
    }
    return { id: 1 };
  },
  trips: (_, __, { user }) => {
    if (!user) {
      return [];
    }
    return [{ id: 1 }];
  }
};

export const tripResolvers: TripResolvers = {
  Query
};
