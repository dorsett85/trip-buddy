import { MutationHookOptions, useMutation, useQuery } from '@apollo/react-hooks';
import { QueryHookOptions } from '@apollo/react-hooks/lib/types';
import {
  ACCEPT_TRIP_INVITE_MUTATION,
  CREATE_TRIP_INVITES_MUTATION,
  GET_TRIP_INVITES_QUERY,
  UPDATE_TRIP_INVITE_MUTATION
} from '../gql/tripInvite';

export const useGetTripInvitesQuery = <TData = any>() =>
  useQuery<TData>(GET_TRIP_INVITES_QUERY);

export const useCreateTripInvitesMutation = <TData = any>(
  options?: QueryHookOptions<TData>
) => useMutation<TData>(CREATE_TRIP_INVITES_MUTATION, options);

export const useUpdateTripInviteMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation<TData>(UPDATE_TRIP_INVITE_MUTATION, options);

export const useAcceptTripInviteMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation<TData>(ACCEPT_TRIP_INVITE_MUTATION, options);
