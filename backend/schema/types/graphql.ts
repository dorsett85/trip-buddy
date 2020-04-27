import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | undefined;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  default?: Maybe<Scalars['Boolean']>;
  user: User;
  possibleTripInvitees: Array<User>;
  trip: Trip;
  trips: Array<Trip>;
  tripItineraries: Array<TripItinerary>;
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
  default?: Maybe<Scalars['Boolean']>;
  loginUser: Scalars['String'];
  registerUser: Scalars['String'];
  verifyEmail: Scalars['Int'];
  updateUser: Scalars['Int'];
  createTrip: Trip;
  updateTrip: Scalars['Int'];
  deleteTrip: Scalars['Int'];
  createTripItinerary: TripItinerary;
  updateTripItinerary: Scalars['Int'];
  deleteTripItinerary: Scalars['Int'];
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
  default?: Maybe<Scalars['Boolean']>;
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
  trips?: Maybe<Array<Trip>>;
};

export type UpdateUserInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  accepting_trip_invites?: Maybe<AcceptingTripInvites>;
  new_user_setup?: Maybe<NewUserSetupInput>;
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
  description?: Maybe<Scalars['String']>;
  location: Scalars['LngLat'];
  location_address: Scalars['String'];
  start_date: Scalars['DateTime'];
};

export type FindTripInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['LngLat']>;
  location_address?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['DateTime']>;
  status?: Maybe<TripStatus>;
  created_date?: Maybe<Scalars['DateTime']>;
};

export type UpdateTripInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['LngLat']>;
  location_address?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['DateTime']>;
  status?: Maybe<TripStatus>;
};

export type Trip = {
   __typename?: 'Trip';
  id: Scalars['Int'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  location: Scalars['LngLat'];
  location_address: Scalars['String'];
  start_date: Scalars['DateTime'];
  status: TripStatus;
  created_date: Scalars['DateTime'];
};

export type CreateTripItineraryInput = {
  trip_id: Scalars['Int'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  location: Scalars['LngLat'];
  location_address: Scalars['String'];
  start_time: Scalars['DateTime'];
};

export type FindTripItineraryInput = {
  id?: Maybe<Scalars['Int']>;
  trip_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['LngLat']>;
  location_address?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['DateTime']>;
  end_time?: Maybe<Scalars['DateTime']>;
  created_date?: Maybe<Scalars['DateTime']>;
};

export type UpdateTripItineraryInput = {
  id: Scalars['Int'];
  trip_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['LngLat']>;
  location_address?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['DateTime']>;
  end_time?: Maybe<Scalars['DateTime']>;
};

export type TripItinerary = {
   __typename?: 'TripItinerary';
  id: Scalars['Int'];
  trip_id: Scalars['Int'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  location: Scalars['LngLat'];
  location_address: Scalars['String'];
  start_time: Scalars['DateTime'];
  end_time?: Maybe<Scalars['DateTime']>;
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
  invitee_id?: Maybe<Scalars['Int']>;
  invitee_email: Scalars['String'];
};

export type UpdateTripInviteInput = {
  id: Scalars['Int'];
  status?: Maybe<TripInviteStatus>;
};

export type TripInvite = {
   __typename?: 'TripInvite';
  id: Scalars['Int'];
  trip_id: Scalars['Int'];
  inviter_id: Scalars['Int'];
  invitee_id?: Maybe<Scalars['Int']>;
  invitee_email: Scalars['String'];
  status: TripInviteStatus;
  created_date: Scalars['DateTime'];
  trip?: Maybe<Trip>;
};

export const CacheControlScope = {
  Public: 'PUBLIC',
  Private: 'PRIVATE'
} as const;

export type CacheControlScope = typeof CacheControlScope[keyof typeof CacheControlScope];




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Query: ResolverTypeWrapper<{}>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Mutation: ResolverTypeWrapper<{}>,
  Subscription: ResolverTypeWrapper<{}>,
  LngLat: ResolverTypeWrapper<Scalars['LngLat']>,
  Role: Role,
  AcceptingTripInvites: AcceptingTripInvites,
  NewUserSetup: ResolverTypeWrapper<NewUserSetup>,
  NewUserSetupInput: NewUserSetupInput,
  User: ResolverTypeWrapper<User>,
  UpdateUserInput: UpdateUserInput,
  TripStatus: TripStatus,
  CreateTripInput: CreateTripInput,
  FindTripInput: FindTripInput,
  UpdateTripInput: UpdateTripInput,
  Trip: ResolverTypeWrapper<Trip>,
  CreateTripItineraryInput: CreateTripItineraryInput,
  FindTripItineraryInput: FindTripItineraryInput,
  UpdateTripItineraryInput: UpdateTripItineraryInput,
  TripItinerary: ResolverTypeWrapper<TripItinerary>,
  TripInviteStatus: TripInviteStatus,
  CreateTripInviteInput: CreateTripInviteInput,
  UpdateTripInviteInput: UpdateTripInviteInput,
  TripInvite: ResolverTypeWrapper<TripInvite>,
  CacheControlScope: CacheControlScope,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Query: {},
  Int: Scalars['Int'],
  Mutation: {},
  Subscription: {},
  LngLat: Scalars['LngLat'],
  Role: Role,
  AcceptingTripInvites: AcceptingTripInvites,
  NewUserSetup: NewUserSetup,
  NewUserSetupInput: NewUserSetupInput,
  User: User,
  UpdateUserInput: UpdateUserInput,
  TripStatus: TripStatus,
  CreateTripInput: CreateTripInput,
  FindTripInput: FindTripInput,
  UpdateTripInput: UpdateTripInput,
  Trip: Trip,
  CreateTripItineraryInput: CreateTripItineraryInput,
  FindTripItineraryInput: FindTripItineraryInput,
  UpdateTripItineraryInput: UpdateTripItineraryInput,
  TripItinerary: TripItinerary,
  TripInviteStatus: TripInviteStatus,
  CreateTripInviteInput: CreateTripInviteInput,
  UpdateTripInviteInput: UpdateTripInviteInput,
  TripInvite: TripInvite,
  CacheControlScope: CacheControlScope,
  Upload: Scalars['Upload'],
  DateTime: Scalars['DateTime'],
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  default: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  user: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  possibleTripInvitees: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryPossibleTripInviteesArgs, 'tripId'>>,
  trip: Resolver<ResolversTypes['Trip'], ParentType, ContextType, RequireFields<QueryTripArgs, 'input'>>,
  trips: Resolver<Array<ResolversTypes['Trip']>, ParentType, ContextType, RequireFields<QueryTripsArgs, 'input'>>,
  tripItineraries: Resolver<Array<ResolversTypes['TripItinerary']>, ParentType, ContextType, RequireFields<QueryTripItinerariesArgs, 'input'>>,
  tripInvites: Resolver<Array<ResolversTypes['TripInvite']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  default: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  loginUser: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'username' | 'password'>>,
  registerUser: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'email' | 'password'>>,
  verifyEmail: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'token'>>,
  updateUser: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>,
  createTrip: Resolver<ResolversTypes['Trip'], ParentType, ContextType, RequireFields<MutationCreateTripArgs, 'input'>>,
  updateTrip: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationUpdateTripArgs, 'input'>>,
  deleteTrip: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDeleteTripArgs, 'id'>>,
  createTripItinerary: Resolver<ResolversTypes['TripItinerary'], ParentType, ContextType, RequireFields<MutationCreateTripItineraryArgs, 'input'>>,
  updateTripItinerary: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationUpdateTripItineraryArgs, 'input'>>,
  deleteTripItinerary: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDeleteTripItineraryArgs, 'id'>>,
  createTripInvites: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationCreateTripInvitesArgs, 'input'>>,
  updateTripInvite: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationUpdateTripInviteArgs, 'input'>>,
  acceptTripInvite: Resolver<ResolversTypes['Trip'], ParentType, ContextType, RequireFields<MutationAcceptTripInviteArgs, 'id'>>,
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  default: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, "default", ParentType, ContextType>,
  tripInviteCreated: SubscriptionResolver<ResolversTypes['TripInvite'], "tripInviteCreated", ParentType, ContextType>,
};

export interface LngLatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LngLat'], any> {
  name: 'LngLat'
}

export type NewUserSetupResolvers<ContextType = any, ParentType extends ResolversParentTypes['NewUserSetup'] = ResolversParentTypes['NewUserSetup']> = {
  email_verified: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  username: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  accepting_trip_invites: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  username: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  password: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email_verified: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  email_verification_token: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  role: Resolver<ResolversTypes['Role'], ParentType, ContextType>,
  accepting_trip_invites: Resolver<ResolversTypes['AcceptingTripInvites'], ParentType, ContextType>,
  created_date: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  new_user_setup: Resolver<ResolversTypes['NewUserSetup'], ParentType, ContextType>,
  trips: Resolver<Maybe<Array<ResolversTypes['Trip']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TripResolvers<ContextType = any, ParentType extends ResolversParentTypes['Trip'] = ResolversParentTypes['Trip']> = {
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  location: Resolver<ResolversTypes['LngLat'], ParentType, ContextType>,
  location_address: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  start_date: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  status: Resolver<ResolversTypes['TripStatus'], ParentType, ContextType>,
  created_date: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TripItineraryResolvers<ContextType = any, ParentType extends ResolversParentTypes['TripItinerary'] = ResolversParentTypes['TripItinerary']> = {
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  trip_id: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  location: Resolver<ResolversTypes['LngLat'], ParentType, ContextType>,
  location_address: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  start_time: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  end_time: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  created_date: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TripInviteResolvers<ContextType = any, ParentType extends ResolversParentTypes['TripInvite'] = ResolversParentTypes['TripInvite']> = {
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  trip_id: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  inviter_id: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  invitee_id: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  invitee_email: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  status: Resolver<ResolversTypes['TripInviteStatus'], ParentType, ContextType>,
  created_date: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  trip: Resolver<Maybe<ResolversTypes['Trip']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type Resolvers<ContextType = any> = {
  Query: QueryResolvers<ContextType>,
  Mutation: MutationResolvers<ContextType>,
  Subscription: SubscriptionResolvers<ContextType>,
  LngLat: GraphQLScalarType,
  NewUserSetup: NewUserSetupResolvers<ContextType>,
  User: UserResolvers<ContextType>,
  Trip: TripResolvers<ContextType>,
  TripItinerary: TripItineraryResolvers<ContextType>,
  TripInvite: TripInviteResolvers<ContextType>,
  Upload: GraphQLScalarType,
  DateTime: GraphQLScalarType,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
