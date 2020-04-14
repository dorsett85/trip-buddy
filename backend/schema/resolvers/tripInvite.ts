import { UserInputError } from 'apollo-server-express';
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE
} from '../../utils/constants/errors';
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
    },
    updateTripInvite: async (_, { input }, { tripInviteService }) => {
      const { id, ...rest } = input;
      const updatedCount = await tripInviteService.updateOne(rest, { items: { id } });
      if (!updatedCount) {
        throw new UserInputError(INTERNAL_SERVER_ERROR_MESSAGE);
      }
      return id;
    },
    acceptTripInvite: async (_, { input }, { tripInviteService }) => {
      const trip = await tripInviteService.acceptOne(input);
      if (!trip) {
        throw new UserInputError(NOT_FOUND_MESSAGE);
      }
      return trip;
    }
  }
};
