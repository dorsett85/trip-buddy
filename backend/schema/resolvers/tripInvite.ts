import { UserInputError } from 'apollo-server-express';
import { NOT_FOUND_MESSAGE } from '../../utils/constants/errors';
import { TripInviteResolvers } from './tripInvite.types';

export const tripInviteResolvers: TripInviteResolvers = {
  TripInvite: {
    trip: async (tripInviteRecord, __, { tripService }) => {
      const trip = await tripService.findOne(
        { items: { id: tripInviteRecord.trip_id } },
        false
      );
      if (!trip) {
        throw new UserInputError(NOT_FOUND_MESSAGE);
      }
      return trip;
    }
  },
  Query: {
    tripInvites: (_, __, { tripInviteService }) => tripInviteService.findMany()
  },
  Mutation: {
    createTripInvites: (_, { input }, { tripInviteService }) => {
      return tripInviteService.createMany(input);
    }
  }
};
