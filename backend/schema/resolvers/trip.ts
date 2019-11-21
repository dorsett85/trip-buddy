import { TripResolvers } from './trip.types';

const Trip: TripResolvers['Trip'] = {
  legs: async ({ id }, __, { TripService }) => {
    const legs = await TripService.getTripLegs(id);
    return legs;
  }
}

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
  Trip,
  Query,
  Mutation
};
