import { UserInputError } from 'apollo-server-express';
import { TripResolvers } from './trip.types';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../../utils/constants/errors';

const Trip: TripResolvers['Trip'] = {
  legs: async ({ id }, __, { TripService }) => {
    const legs = await TripService.findTripLegs({ trip_id: id });
    return legs;
  }
};

const TripLeg: TripResolvers['TripLeg'] = {
  itinerary: async ({ id }, __, { TripService }) => {
    const legs = await TripService.findTripLegItinerary({ trip_leg_id: id });
    return legs;
  }
};

const Query: TripResolvers['Query'] = {
  // TODO Add TripService method to get a Trip based on tripinput and user id 
  trip: async (_, { input }, { user, TripService }) =>
    (await TripService.findByUserId(user.id))[0],
  trips: (_, __, { user, TripService }) => TripService.findByUserId(user.id)
};

const Mutation: TripResolvers['Mutation'] = {
  createTrip: async (_, { input }, { user, TripService }) => {
    const trip = await TripService.createOne(input, user.id);
    return trip;
  },
  // TODO Only allow updates to user's trips
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
  TripLeg,
  Query,
  Mutation
};
