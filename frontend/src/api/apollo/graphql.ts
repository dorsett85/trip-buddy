import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An array of length two with float types representing lng/lat points */
  LngLat: [number, number];
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string;
};

export type Query = {
   __typename?: 'Query';
  default: Maybe<Scalars['Boolean']>;
  user: Maybe<User>;
  possibleTripInvitees: Maybe<Array<Maybe<User>>>;
  trip: Maybe<Trip>;
  trips: Maybe<Array<Maybe<Trip>>>;
  tripItineraries: Maybe<Array<Maybe<TripItinerary>>>;
  tripInvites: Array<TripInvite>;
};


export type QueryPossibleTripInviteesArgs = {
  tripId: Scalars['Int'];
};


export type QueryTripArgs = {
  input: FindTripInput;
};


export type QueryTripsArgs = {
  input: FindTripInput;
};


export type QueryTripItinerariesArgs = {
  input: FindTripItineraryInput;
};

export type Mutation = {
   __typename?: 'Mutation';
  default: Maybe<Scalars['Boolean']>;
  loginUser: Maybe<Scalars['String']>;
  registerUser: Maybe<Scalars['String']>;
  verifyEmail: Maybe<Scalars['Int']>;
  updateUser: Maybe<Scalars['Int']>;
  createTrip: Maybe<Trip>;
  updateTrip: Maybe<Scalars['Int']>;
  deleteTrip: Maybe<Scalars['Int']>;
  createTripItinerary: Maybe<TripItinerary>;
  updateTripItinerary: Maybe<Scalars['Int']>;
  deleteTripItinerary: Maybe<Scalars['Int']>;
  createTripInvites: Array<Scalars['Int']>;
  updateTripInvite: Scalars['Int'];
  acceptTripInvite: Trip;
};


export type MutationLoginUserArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationCreateTripArgs = {
  input: CreateTripInput;
};


export type MutationUpdateTripArgs = {
  input: UpdateTripInput;
};


export type MutationDeleteTripArgs = {
  id: Scalars['Int'];
};


export type MutationCreateTripItineraryArgs = {
  input: CreateTripItineraryInput;
};


export type MutationUpdateTripItineraryArgs = {
  input: UpdateTripItineraryInput;
};


export type MutationDeleteTripItineraryArgs = {
  id: Scalars['Int'];
};


export type MutationCreateTripInvitesArgs = {
  input: Array<CreateTripInviteInput>;
};


export type MutationUpdateTripInviteArgs = {
  input: UpdateTripInviteInput;
};


export type MutationAcceptTripInviteArgs = {
  id: Scalars['Int'];
};

export type Subscription = {
   __typename?: 'Subscription';
  default: Maybe<Scalars['Boolean']>;
  tripInviteCreated: TripInvite;
};


export const Role = {
  Admin: 'admin',
  Customer: 'customer'
} as const;

export type Role = typeof Role[keyof typeof Role];
export const AcceptingTripInvites = {
  No: 'no',
  Friends: 'friends',
  All: 'all'
} as const;

export type AcceptingTripInvites = typeof AcceptingTripInvites[keyof typeof AcceptingTripInvites];
export type NewUserSetup = {
   __typename?: 'NewUserSetup';
  email_verified: Scalars['Boolean'];
  username: Scalars['Boolean'];
  accepting_trip_invites: Scalars['Boolean'];
};

export type NewUserSetupInput = {
  email_verified: Scalars['Boolean'];
  username: Scalars['Boolean'];
  accepting_trip_invites: Scalars['Boolean'];
};

export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  email_verified: Scalars['Boolean'];
  email_verification_token: Scalars['String'];
  role: Role;
  accepting_trip_invites: AcceptingTripInvites;
  created_date: Scalars['DateTime'];
  new_user_setup: NewUserSetup;
  trips: Maybe<Array<Maybe<Trip>>>;
};

export type UpdateUserInput = {
  username: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  password: Maybe<Scalars['String']>;
  accepting_trip_invites: Maybe<AcceptingTripInvites>;
  new_user_setup: Maybe<NewUserSetupInput>;
};

export const TripStatus = {
  Pending: 'pending',
  Confirmed: 'confirmed',
  Active: 'active',
  Completed: 'completed',
  Cancelled: 'cancelled'
} as const;

export type TripStatus = typeof TripStatus[keyof typeof TripStatus];
export type CreateTripInput = {
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  location: Scalars['LngLat'];
  location_address: Scalars['String'];
  start_date: Scalars['DateTime'];
};

export type FindTripInput = {
  id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  location: Maybe<Scalars['LngLat']>;
  location_address: Maybe<Scalars['String']>;
  start_date: Maybe<Scalars['DateTime']>;
  status: Maybe<TripStatus>;
  created_date: Maybe<Scalars['DateTime']>;
};

export type UpdateTripInput = {
  id: Scalars['Int'];
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  location: Maybe<Scalars['LngLat']>;
  location_address: Maybe<Scalars['String']>;
  start_date: Maybe<Scalars['DateTime']>;
  status: Maybe<TripStatus>;
};

export type Trip = {
   __typename?: 'Trip';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  location: Scalars['LngLat'];
  location_address: Scalars['String'];
  start_date: Scalars['DateTime'];
  status: TripStatus;
  created_date: Scalars['DateTime'];
};

export type CreateTripItineraryInput = {
  trip_id: Scalars['Int'];
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  location: Scalars['LngLat'];
  location_address: Scalars['String'];
  start_time: Scalars['DateTime'];
};

export type FindTripItineraryInput = {
  id: Maybe<Scalars['Int']>;
  trip_id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  location: Maybe<Scalars['LngLat']>;
  location_address: Maybe<Scalars['String']>;
  start_time: Maybe<Scalars['DateTime']>;
  end_time: Maybe<Scalars['DateTime']>;
  created_date: Maybe<Scalars['DateTime']>;
};

export type UpdateTripItineraryInput = {
  id: Scalars['Int'];
  trip_id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  location: Maybe<Scalars['LngLat']>;
  location_address: Maybe<Scalars['String']>;
  start_time: Maybe<Scalars['DateTime']>;
  end_time: Maybe<Scalars['DateTime']>;
};

export type TripItinerary = {
   __typename?: 'TripItinerary';
  id: Scalars['Int'];
  trip_id: Scalars['Int'];
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  location: Scalars['LngLat'];
  location_address: Scalars['String'];
  start_time: Scalars['DateTime'];
  end_time: Maybe<Scalars['DateTime']>;
  created_date: Scalars['DateTime'];
};

export const TripInviteStatus = {
  Initiated: 'initiated',
  Notified: 'notified',
  Accepted: 'accepted',
  Declined: 'declined'
} as const;

export type TripInviteStatus = typeof TripInviteStatus[keyof typeof TripInviteStatus];
export type CreateTripInviteInput = {
  trip_id: Scalars['Int'];
  invitee_id: Maybe<Scalars['Int']>;
  invitee_email: Scalars['String'];
};

export type UpdateTripInviteInput = {
  id: Scalars['Int'];
  status: Maybe<TripInviteStatus>;
};

export type TripInvite = {
   __typename?: 'TripInvite';
  id: Scalars['Int'];
  trip_id: Scalars['Int'];
  inviter_id: Scalars['Int'];
  invitee_id: Maybe<Scalars['Int']>;
  invitee_email: Scalars['String'];
  status: TripInviteStatus;
  created_date: Scalars['DateTime'];
  trip: Maybe<Trip>;
};

export const CacheControlScope = {
  Public: 'PUBLIC',
  Private: 'PRIVATE'
} as const;

export type CacheControlScope = typeof CacheControlScope[keyof typeof CacheControlScope];


export type TripFieldsFragment = (
  { __typename?: 'Trip' }
  & Pick<Trip, 'id' | 'name' | 'description' | 'location' | 'location_address' | 'start_date' | 'status' | 'created_date'>
);

export type CreateTripMutationVariables = {
  input: CreateTripInput;
};


export type CreateTripMutation = (
  { __typename?: 'Mutation' }
  & { createTrip: Maybe<(
    { __typename?: 'Trip' }
    & TripFieldsFragment
  )> }
);

export type UpdateTripMutationVariables = {
  input: UpdateTripInput;
};


export type UpdateTripMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateTrip'>
);

export type DeleteTripMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteTripMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTrip'>
);

export type TripInvitesQueryVariables = {};


export type TripInvitesQuery = (
  { __typename?: 'Query' }
  & { tripInvites: Array<(
    { __typename?: 'TripInvite' }
    & Pick<TripInvite, 'id' | 'trip_id' | 'status' | 'created_date'>
    & { trip: Maybe<(
      { __typename?: 'Trip' }
      & Pick<Trip, 'name' | 'location_address' | 'start_date'>
    )> }
  )> }
);

export type CreateTripInvitesMutationVariables = {
  input: Array<CreateTripInviteInput>;
};


export type CreateTripInvitesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createTripInvites'>
);

export type UpdateTripInviteMutationVariables = {
  input: UpdateTripInviteInput;
};


export type UpdateTripInviteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateTripInvite'>
);

export type AcceptTripInviteMutationVariables = {
  id: Scalars['Int'];
};


export type AcceptTripInviteMutation = (
  { __typename?: 'Mutation' }
  & { acceptTripInvite: (
    { __typename?: 'Trip' }
    & TripFieldsFragment
  ) }
);

export type TripInvitesIdQueryVariables = {};


export type TripInvitesIdQuery = (
  { __typename?: 'Query' }
  & { tripInvites: Array<(
    { __typename?: 'TripInvite' }
    & Pick<TripInvite, 'id'>
  )> }
);

export type TripInviteCreatedSubscriptionVariables = {};


export type TripInviteCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { tripInviteCreated: (
    { __typename?: 'TripInvite' }
    & Pick<TripInvite, 'id' | 'status'>
  ) }
);

export type TripItineraryFieldsFragment = (
  { __typename?: 'TripItinerary' }
  & Pick<TripItinerary, 'id' | 'trip_id' | 'name' | 'description' | 'location' | 'location_address' | 'start_time' | 'end_time'>
);

export type GetItineraryQueryVariables = {
  input: FindTripItineraryInput;
};


export type GetItineraryQuery = (
  { __typename?: 'Query' }
  & { tripItineraries: Maybe<Array<Maybe<(
    { __typename?: 'TripItinerary' }
    & TripItineraryFieldsFragment
  )>>> }
);

export type CreateTripItineraryMutationVariables = {
  input: CreateTripItineraryInput;
};


export type CreateTripItineraryMutation = (
  { __typename?: 'Mutation' }
  & { createTripItinerary: Maybe<(
    { __typename?: 'TripItinerary' }
    & TripItineraryFieldsFragment
  )> }
);

export type UpdateTripItineraryMutationVariables = {
  input: UpdateTripItineraryInput;
};


export type UpdateTripItineraryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateTripItinerary'>
);

export type DeleteTripItineraryMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteTripItineraryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTripItinerary'>
);

export type GetLoggedInUserQueryVariables = {};


export type GetLoggedInUserQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'password' | 'email_verified' | 'role' | 'accepting_trip_invites' | 'created_date'>
    & { new_user_setup: (
      { __typename?: 'NewUserSetup' }
      & Pick<NewUserSetup, 'email_verified' | 'username' | 'accepting_trip_invites'>
    ), trips: Maybe<Array<Maybe<(
      { __typename?: 'Trip' }
      & TripFieldsFragment
    )>>> }
  )> }
);

export type LoginUserMutationVariables = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'loginUser'>
);

export type RegisterUserMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'registerUser'>
);

export type VerifyEmailMutationVariables = {
  token: Scalars['String'];
};


export type VerifyEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'verifyEmail'>
);

export type UpdateUserMutationVariables = {
  input: UpdateUserInput;
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateUser'>
);

export type PossibleTripInviteesQueryVariables = {
  tripId: Scalars['Int'];
};


export type PossibleTripInviteesQuery = (
  { __typename?: 'Query' }
  & { possibleTripInvitees: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )>>> }
);

export const TripFieldsFragmentDoc = gql`
    fragment TripFields on Trip {
  id
  name
  description
  location
  location_address
  start_date
  status
  created_date
}
    `;
export const TripItineraryFieldsFragmentDoc = gql`
    fragment TripItineraryFields on TripItinerary {
  id
  trip_id
  name
  description
  location
  location_address
  start_time
  end_time
}
    `;
export const CreateTripDocument = gql`
    mutation CreateTrip($input: CreateTripInput!) {
  createTrip(input: $input) {
    ...TripFields
  }
}
    ${TripFieldsFragmentDoc}`;
export type CreateTripMutationFn = ApolloReactCommon.MutationFunction<CreateTripMutation, CreateTripMutationVariables>;

/**
 * __useCreateTripMutation__
 *
 * To run a mutation, you first call `useCreateTripMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTripMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTripMutation, { data, loading, error }] = useCreateTripMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTripMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTripMutation, CreateTripMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTripMutation, CreateTripMutationVariables>(CreateTripDocument, baseOptions);
      }
export type CreateTripMutationHookResult = ReturnType<typeof useCreateTripMutation>;
export type CreateTripMutationResult = ApolloReactCommon.MutationResult<CreateTripMutation>;
export type CreateTripMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTripMutation, CreateTripMutationVariables>;
export const UpdateTripDocument = gql`
    mutation UpdateTrip($input: UpdateTripInput!) {
  updateTrip(input: $input)
}
    `;
export type UpdateTripMutationFn = ApolloReactCommon.MutationFunction<UpdateTripMutation, UpdateTripMutationVariables>;

/**
 * __useUpdateTripMutation__
 *
 * To run a mutation, you first call `useUpdateTripMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTripMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTripMutation, { data, loading, error }] = useUpdateTripMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTripMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTripMutation, UpdateTripMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTripMutation, UpdateTripMutationVariables>(UpdateTripDocument, baseOptions);
      }
export type UpdateTripMutationHookResult = ReturnType<typeof useUpdateTripMutation>;
export type UpdateTripMutationResult = ApolloReactCommon.MutationResult<UpdateTripMutation>;
export type UpdateTripMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTripMutation, UpdateTripMutationVariables>;
export const DeleteTripDocument = gql`
    mutation DeleteTrip($id: Int!) {
  deleteTrip(id: $id)
}
    `;
export type DeleteTripMutationFn = ApolloReactCommon.MutationFunction<DeleteTripMutation, DeleteTripMutationVariables>;

/**
 * __useDeleteTripMutation__
 *
 * To run a mutation, you first call `useDeleteTripMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTripMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTripMutation, { data, loading, error }] = useDeleteTripMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTripMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTripMutation, DeleteTripMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTripMutation, DeleteTripMutationVariables>(DeleteTripDocument, baseOptions);
      }
export type DeleteTripMutationHookResult = ReturnType<typeof useDeleteTripMutation>;
export type DeleteTripMutationResult = ApolloReactCommon.MutationResult<DeleteTripMutation>;
export type DeleteTripMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTripMutation, DeleteTripMutationVariables>;
export const TripInvitesDocument = gql`
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

/**
 * __useTripInvitesQuery__
 *
 * To run a query within a React component, call `useTripInvitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTripInvitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTripInvitesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTripInvitesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TripInvitesQuery, TripInvitesQueryVariables>) {
        return ApolloReactHooks.useQuery<TripInvitesQuery, TripInvitesQueryVariables>(TripInvitesDocument, baseOptions);
      }
export function useTripInvitesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TripInvitesQuery, TripInvitesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TripInvitesQuery, TripInvitesQueryVariables>(TripInvitesDocument, baseOptions);
        }
export type TripInvitesQueryHookResult = ReturnType<typeof useTripInvitesQuery>;
export type TripInvitesLazyQueryHookResult = ReturnType<typeof useTripInvitesLazyQuery>;
export type TripInvitesQueryResult = ApolloReactCommon.QueryResult<TripInvitesQuery, TripInvitesQueryVariables>;
export const CreateTripInvitesDocument = gql`
    mutation CreateTripInvites($input: [CreateTripInviteInput!]!) {
  createTripInvites(input: $input)
}
    `;
export type CreateTripInvitesMutationFn = ApolloReactCommon.MutationFunction<CreateTripInvitesMutation, CreateTripInvitesMutationVariables>;

/**
 * __useCreateTripInvitesMutation__
 *
 * To run a mutation, you first call `useCreateTripInvitesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTripInvitesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTripInvitesMutation, { data, loading, error }] = useCreateTripInvitesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTripInvitesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTripInvitesMutation, CreateTripInvitesMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTripInvitesMutation, CreateTripInvitesMutationVariables>(CreateTripInvitesDocument, baseOptions);
      }
export type CreateTripInvitesMutationHookResult = ReturnType<typeof useCreateTripInvitesMutation>;
export type CreateTripInvitesMutationResult = ApolloReactCommon.MutationResult<CreateTripInvitesMutation>;
export type CreateTripInvitesMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTripInvitesMutation, CreateTripInvitesMutationVariables>;
export const UpdateTripInviteDocument = gql`
    mutation UpdateTripInvite($input: UpdateTripInviteInput!) {
  updateTripInvite(input: $input)
}
    `;
export type UpdateTripInviteMutationFn = ApolloReactCommon.MutationFunction<UpdateTripInviteMutation, UpdateTripInviteMutationVariables>;

/**
 * __useUpdateTripInviteMutation__
 *
 * To run a mutation, you first call `useUpdateTripInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTripInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTripInviteMutation, { data, loading, error }] = useUpdateTripInviteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTripInviteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTripInviteMutation, UpdateTripInviteMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTripInviteMutation, UpdateTripInviteMutationVariables>(UpdateTripInviteDocument, baseOptions);
      }
export type UpdateTripInviteMutationHookResult = ReturnType<typeof useUpdateTripInviteMutation>;
export type UpdateTripInviteMutationResult = ApolloReactCommon.MutationResult<UpdateTripInviteMutation>;
export type UpdateTripInviteMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTripInviteMutation, UpdateTripInviteMutationVariables>;
export const AcceptTripInviteDocument = gql`
    mutation AcceptTripInvite($id: Int!) {
  acceptTripInvite(id: $id) {
    ...TripFields
  }
}
    ${TripFieldsFragmentDoc}`;
export type AcceptTripInviteMutationFn = ApolloReactCommon.MutationFunction<AcceptTripInviteMutation, AcceptTripInviteMutationVariables>;

/**
 * __useAcceptTripInviteMutation__
 *
 * To run a mutation, you first call `useAcceptTripInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptTripInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptTripInviteMutation, { data, loading, error }] = useAcceptTripInviteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAcceptTripInviteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AcceptTripInviteMutation, AcceptTripInviteMutationVariables>) {
        return ApolloReactHooks.useMutation<AcceptTripInviteMutation, AcceptTripInviteMutationVariables>(AcceptTripInviteDocument, baseOptions);
      }
export type AcceptTripInviteMutationHookResult = ReturnType<typeof useAcceptTripInviteMutation>;
export type AcceptTripInviteMutationResult = ApolloReactCommon.MutationResult<AcceptTripInviteMutation>;
export type AcceptTripInviteMutationOptions = ApolloReactCommon.BaseMutationOptions<AcceptTripInviteMutation, AcceptTripInviteMutationVariables>;
export const TripInvitesIdDocument = gql`
    query TripInvitesId {
  tripInvites {
    id
  }
}
    `;

/**
 * __useTripInvitesIdQuery__
 *
 * To run a query within a React component, call `useTripInvitesIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTripInvitesIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTripInvitesIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useTripInvitesIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TripInvitesIdQuery, TripInvitesIdQueryVariables>) {
        return ApolloReactHooks.useQuery<TripInvitesIdQuery, TripInvitesIdQueryVariables>(TripInvitesIdDocument, baseOptions);
      }
export function useTripInvitesIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TripInvitesIdQuery, TripInvitesIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TripInvitesIdQuery, TripInvitesIdQueryVariables>(TripInvitesIdDocument, baseOptions);
        }
export type TripInvitesIdQueryHookResult = ReturnType<typeof useTripInvitesIdQuery>;
export type TripInvitesIdLazyQueryHookResult = ReturnType<typeof useTripInvitesIdLazyQuery>;
export type TripInvitesIdQueryResult = ApolloReactCommon.QueryResult<TripInvitesIdQuery, TripInvitesIdQueryVariables>;
export const TripInviteCreatedDocument = gql`
    subscription TripInviteCreated {
  tripInviteCreated {
    id
    status
  }
}
    `;

/**
 * __useTripInviteCreatedSubscription__
 *
 * To run a query within a React component, call `useTripInviteCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTripInviteCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTripInviteCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTripInviteCreatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<TripInviteCreatedSubscription, TripInviteCreatedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<TripInviteCreatedSubscription, TripInviteCreatedSubscriptionVariables>(TripInviteCreatedDocument, baseOptions);
      }
export type TripInviteCreatedSubscriptionHookResult = ReturnType<typeof useTripInviteCreatedSubscription>;
export type TripInviteCreatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<TripInviteCreatedSubscription>;
export const GetItineraryDocument = gql`
    query GetItinerary($input: FindTripItineraryInput!) {
  tripItineraries(input: $input) {
    ...TripItineraryFields
  }
}
    ${TripItineraryFieldsFragmentDoc}`;

/**
 * __useGetItineraryQuery__
 *
 * To run a query within a React component, call `useGetItineraryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItineraryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItineraryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetItineraryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetItineraryQuery, GetItineraryQueryVariables>) {
        return ApolloReactHooks.useQuery<GetItineraryQuery, GetItineraryQueryVariables>(GetItineraryDocument, baseOptions);
      }
export function useGetItineraryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetItineraryQuery, GetItineraryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetItineraryQuery, GetItineraryQueryVariables>(GetItineraryDocument, baseOptions);
        }
export type GetItineraryQueryHookResult = ReturnType<typeof useGetItineraryQuery>;
export type GetItineraryLazyQueryHookResult = ReturnType<typeof useGetItineraryLazyQuery>;
export type GetItineraryQueryResult = ApolloReactCommon.QueryResult<GetItineraryQuery, GetItineraryQueryVariables>;
export const CreateTripItineraryDocument = gql`
    mutation CreateTripItinerary($input: CreateTripItineraryInput!) {
  createTripItinerary(input: $input) {
    ...TripItineraryFields
  }
}
    ${TripItineraryFieldsFragmentDoc}`;
export type CreateTripItineraryMutationFn = ApolloReactCommon.MutationFunction<CreateTripItineraryMutation, CreateTripItineraryMutationVariables>;

/**
 * __useCreateTripItineraryMutation__
 *
 * To run a mutation, you first call `useCreateTripItineraryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTripItineraryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTripItineraryMutation, { data, loading, error }] = useCreateTripItineraryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTripItineraryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTripItineraryMutation, CreateTripItineraryMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTripItineraryMutation, CreateTripItineraryMutationVariables>(CreateTripItineraryDocument, baseOptions);
      }
export type CreateTripItineraryMutationHookResult = ReturnType<typeof useCreateTripItineraryMutation>;
export type CreateTripItineraryMutationResult = ApolloReactCommon.MutationResult<CreateTripItineraryMutation>;
export type CreateTripItineraryMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTripItineraryMutation, CreateTripItineraryMutationVariables>;
export const UpdateTripItineraryDocument = gql`
    mutation UpdateTripItinerary($input: UpdateTripItineraryInput!) {
  updateTripItinerary(input: $input)
}
    `;
export type UpdateTripItineraryMutationFn = ApolloReactCommon.MutationFunction<UpdateTripItineraryMutation, UpdateTripItineraryMutationVariables>;

/**
 * __useUpdateTripItineraryMutation__
 *
 * To run a mutation, you first call `useUpdateTripItineraryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTripItineraryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTripItineraryMutation, { data, loading, error }] = useUpdateTripItineraryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTripItineraryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTripItineraryMutation, UpdateTripItineraryMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTripItineraryMutation, UpdateTripItineraryMutationVariables>(UpdateTripItineraryDocument, baseOptions);
      }
export type UpdateTripItineraryMutationHookResult = ReturnType<typeof useUpdateTripItineraryMutation>;
export type UpdateTripItineraryMutationResult = ApolloReactCommon.MutationResult<UpdateTripItineraryMutation>;
export type UpdateTripItineraryMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTripItineraryMutation, UpdateTripItineraryMutationVariables>;
export const DeleteTripItineraryDocument = gql`
    mutation DeleteTripItinerary($id: Int!) {
  deleteTripItinerary(id: $id)
}
    `;
export type DeleteTripItineraryMutationFn = ApolloReactCommon.MutationFunction<DeleteTripItineraryMutation, DeleteTripItineraryMutationVariables>;

/**
 * __useDeleteTripItineraryMutation__
 *
 * To run a mutation, you first call `useDeleteTripItineraryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTripItineraryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTripItineraryMutation, { data, loading, error }] = useDeleteTripItineraryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTripItineraryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTripItineraryMutation, DeleteTripItineraryMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTripItineraryMutation, DeleteTripItineraryMutationVariables>(DeleteTripItineraryDocument, baseOptions);
      }
export type DeleteTripItineraryMutationHookResult = ReturnType<typeof useDeleteTripItineraryMutation>;
export type DeleteTripItineraryMutationResult = ApolloReactCommon.MutationResult<DeleteTripItineraryMutation>;
export type DeleteTripItineraryMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTripItineraryMutation, DeleteTripItineraryMutationVariables>;
export const GetLoggedInUserDocument = gql`
    query GetLoggedInUser {
  user {
    id
    username
    email
    password
    email_verified
    role
    accepting_trip_invites
    created_date
    new_user_setup {
      email_verified
      username
      accepting_trip_invites
    }
    trips {
      ...TripFields
    }
  }
}
    ${TripFieldsFragmentDoc}`;

/**
 * __useGetLoggedInUserQuery__
 *
 * To run a query within a React component, call `useGetLoggedInUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoggedInUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoggedInUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoggedInUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetLoggedInUserQuery, GetLoggedInUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetLoggedInUserQuery, GetLoggedInUserQueryVariables>(GetLoggedInUserDocument, baseOptions);
      }
export function useGetLoggedInUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLoggedInUserQuery, GetLoggedInUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetLoggedInUserQuery, GetLoggedInUserQueryVariables>(GetLoggedInUserDocument, baseOptions);
        }
export type GetLoggedInUserQueryHookResult = ReturnType<typeof useGetLoggedInUserQuery>;
export type GetLoggedInUserLazyQueryHookResult = ReturnType<typeof useGetLoggedInUserLazyQuery>;
export type GetLoggedInUserQueryResult = ApolloReactCommon.QueryResult<GetLoggedInUserQuery, GetLoggedInUserQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($username: String!, $password: String!) {
  loginUser(username: $username, password: $password)
}
    `;
export type LoginUserMutationFn = ApolloReactCommon.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, baseOptions);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = ApolloReactCommon.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($email: String!, $password: String!) {
  registerUser(email: $email, password: $password)
}
    `;
export type RegisterUserMutationFn = ApolloReactCommon.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, baseOptions);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = ApolloReactCommon.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($token: String!) {
  verifyEmail(token: $token)
}
    `;
export type VerifyEmailMutationFn = ApolloReactCommon.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        return ApolloReactHooks.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, baseOptions);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = ApolloReactCommon.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input)
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const PossibleTripInviteesDocument = gql`
    query PossibleTripInvitees($tripId: Int!) {
  possibleTripInvitees(tripId: $tripId) {
    id
    email
  }
}
    `;

/**
 * __usePossibleTripInviteesQuery__
 *
 * To run a query within a React component, call `usePossibleTripInviteesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePossibleTripInviteesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePossibleTripInviteesQuery({
 *   variables: {
 *      tripId: // value for 'tripId'
 *   },
 * });
 */
export function usePossibleTripInviteesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PossibleTripInviteesQuery, PossibleTripInviteesQueryVariables>) {
        return ApolloReactHooks.useQuery<PossibleTripInviteesQuery, PossibleTripInviteesQueryVariables>(PossibleTripInviteesDocument, baseOptions);
      }
export function usePossibleTripInviteesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PossibleTripInviteesQuery, PossibleTripInviteesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PossibleTripInviteesQuery, PossibleTripInviteesQueryVariables>(PossibleTripInviteesDocument, baseOptions);
        }
export type PossibleTripInviteesQueryHookResult = ReturnType<typeof usePossibleTripInviteesQuery>;
export type PossibleTripInviteesLazyQueryHookResult = ReturnType<typeof usePossibleTripInviteesLazyQuery>;
export type PossibleTripInviteesQueryResult = ApolloReactCommon.QueryResult<PossibleTripInviteesQuery, PossibleTripInviteesQueryVariables>;