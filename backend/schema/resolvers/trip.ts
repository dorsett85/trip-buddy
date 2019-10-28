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

export const tripResolvers: TripResolvers = {
  Query
};
