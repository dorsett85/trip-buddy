import { useQuery } from '@apollo/react-hooks';
import { GET_TRIP_INVITES_QUERY } from '../gql/tripInvite';

export const useGetTripInvitesQuery = <TData = any>() =>
  useQuery<TData>(GET_TRIP_INVITES_QUERY);
