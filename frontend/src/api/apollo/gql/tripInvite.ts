import gql from 'graphql-tag';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import {
  MutationHookOptions,
  QueryHookOptions,
  SubscriptionHookOptions,
  useMutation,
  useQuery,
  useSubscription
} from '@apollo/react-hooks';
import { TripRecord } from 'common/lib/types/trip';
import { TRIP_FIELDS } from './trip';
import { GQLTypename } from './types';

//

export const TRIP_INVITES_QUERY = gql`
  query TripInvites {
    tripInvites {
      id
      trip_id
      status
      created_date
      trip {
        name
        location_address
        start_date
      }
    }
  }
`;

export const CREATE_TRIP_INVITES_MUTATION = gql`
  mutation CreateTripInvites($input: [CreateTripInviteInput!]!) {
    createTripInvites(input: $input)
  }
`;
export const UPDATE_TRIP_INVITE_MUTATION = gql`
  mutation UpdateTripInvite($input: UpdateTripInviteInput!) {
    updateTripInvite(input: $input)
  }
`;

//

interface AcceptTripInviteMutationData {
  acceptTripInvite: TripRecord & GQLTypename;
}
interface AcceptTripInviteMutationVariables {
  id: TripInviteRecord['id'];
}
export const ACCEPT_TRIP_INVITE_MUTATION = gql`
  mutation AcceptTripInvite($id: Int!) {
    acceptTripInvite(id: $id) {
      ${TRIP_FIELDS}
    }
  }
`;
export const useAcceptTripInviteMutation = (
  options?: MutationHookOptions<
    AcceptTripInviteMutationData,
    AcceptTripInviteMutationVariables
  >
) =>
  useMutation<AcceptTripInviteMutationData, AcceptTripInviteMutationVariables>(
    ACCEPT_TRIP_INVITE_MUTATION,
    options
  );

//

interface TripInvitesIdQueryData {
  tripInvites: (Pick<TripInviteRecord, 'id'> & GQLTypename)[];
}
const TRIP_INVITES_ID_QUERY = gql`
  query TripInvitesId {
    tripInvites {
      id
    }
  }
`;
export const useTripInvitesIdQuery = (options?: QueryHookOptions) =>
  useQuery<TripInvitesIdQueryData>(TRIP_INVITES_ID_QUERY, options);

//

interface TripInviteCreatedSubscriptionData {
  tripInviteCreated: Pick<TripInviteRecord, 'id'> & GQLTypename;
}
const TRIP_INVITE_CREATED_SUBSCRIPTION = gql`
  subscription TripInviteCreated {
    tripInviteCreated {
      id
      status
    }
  }
`;
export const useTripInviteCreatedSubscription = (options?: SubscriptionHookOptions) =>
  useSubscription<TripInviteCreatedSubscriptionData>(
    TRIP_INVITE_CREATED_SUBSCRIPTION,
    options
  );
