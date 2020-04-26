import { UserInputError } from 'apollo-server-express';
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE
} from '../../utils/constants/errors';
import { TripInviteResolvers } from './tripInvite.types';
import { subscribeWithFilter } from '../../utils/subscribeWithFilter';

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
    acceptTripInvite: async (_, { id }, { tripInviteService }) => {
      const trip = await tripInviteService.acceptOne(id);
      if (!trip) {
        throw new UserInputError(NOT_FOUND_MESSAGE);
      }
      return trip;
    }
  },
  Subscription: {
    tripInviteCreated: {
      resolve: (tripInvites, input, { user }) => {
        // Only send the invite that matches with the user id.
        // tripInvites could technically come from anywhere with any type so
        // we need to define the type in the anonymous function.
        // TODO create a custom resolve function with a type guard
        return tripInvites.filter((invite: any) => invite.invitee_id === user.id)[0];
      },
      subscribe: subscribeWithFilter<
        TripInviteResolvers['Subscription']['tripInviteCreated']['subscribe']
      >(
        (_, __, { pubsub }) => pubsub.asyncIterator('tripInviteCreated'),
        (tripInvites, __, { user }) => {
          // Only send the invites if the user id matches any of the invitee ids
          return tripInvites.some(invite => invite.invitee_id === user.id);
        }
      )
    }
  }
};
