import {
  QueryHookOptions,
  MutationHookOptions,
  SubscriptionHookOptions,
  useMutation,
  useQuery,
  useSubscription
} from '@apollo/react-hooks';
import {
  ACCEPT_TRIP_INVITE_MUTATION,
  CREATE_TRIP_INVITES_MUTATION,
  GET_TRIP_INVITES_QUERY,
  TRIP_INVITE_CREATED_SUBSCRIPTION,
  UPDATE_TRIP_INVITE_MUTATION
} from '../gql/tripInvite';

export const useGetTripInvitesQuery = <TData = any>(options?: QueryHookOptions) =>
  useQuery<TData>(GET_TRIP_INVITES_QUERY, options);

export const useCreateTripInvitesMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation<TData>(CREATE_TRIP_INVITES_MUTATION, options);

export const useUpdateTripInviteMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation<TData>(UPDATE_TRIP_INVITE_MUTATION, options);

export const useAcceptTripInviteMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation<TData>(ACCEPT_TRIP_INVITE_MUTATION, options);

export const useTripInviteCreatedSubscription = <TData = any>(
  options?: SubscriptionHookOptions
) => useSubscription<TData>(TRIP_INVITE_CREATED_SUBSCRIPTION, options);
