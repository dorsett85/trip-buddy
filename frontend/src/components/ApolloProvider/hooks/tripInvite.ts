import { useMutation, useQuery } from '@apollo/react-hooks';
import { QueryHookOptions } from '@apollo/react-hooks/lib/types';
import { CREATE_TRIP_INVITES_MUTATION, GET_TRIP_INVITES_QUERY } from '../gql/tripInvite';

export const useGetTripInvitesQuery = <TData = any>() =>
  useQuery<TData>(GET_TRIP_INVITES_QUERY);

export const useCreateTripInvitesMutation = <TData = any>(
  options?: QueryHookOptions<TData>
) => useMutation<TData>(CREATE_TRIP_INVITES_MUTATION, options);
