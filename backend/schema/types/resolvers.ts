import { IFieldResolver } from 'apollo-server-express';
import { ChangeReturnType } from 'common/lib/types/utils';
import { ContextObj } from './contextObj';
import {
  MutationResolvers,
  QueryResolvers,
  SubscriptionResolverObject,
  TripInviteResolvers
} from './graphql';

/**
 * IFieldResolver modification that puts arguments in the correct order, specifies
 * our context object, and allows specifying a return type. The TAuth argument is
 * to let the resolver know if context object includes authorized properties.
 */
export type FieldResolver<
  TSource,
  TArgs = Record<string, any>,
  TReturn = any,
  TAuth = false
> = ChangeReturnType<IFieldResolver<TSource, ContextObj<TAuth>, TArgs>, TReturn>;

/**
 * Shortcut for authorized field resolvers
 */
export type AuthFieldResolver<
  TSource,
  TArgs = Record<string, any>,
  TReturn = any
> = FieldResolver<TSource, TArgs, TReturn, true>;

/**
 * All of our Query field resolvers, which defaults to using unauthenticated
 * context.
 */
export type QueryFieldResolvers<TAuth = false> = QueryResolvers<ContextObj<TAuth>>;

/**
 * Shortcut for authenticated Query field resolvers
 */
export type AuthQueryFieldResolvers = QueryFieldResolvers<true>;

/**
 * All of our Mutation field resolvers, which defaults to using unauthenticated
 * context.
 */
export type MutationFieldResolvers<TAuth = false> = MutationResolvers<ContextObj<TAuth>>;

/**
 * Shortcut for authenticated Mutation field resolvers
 */
export type AuthMutationFieldResolvers = MutationFieldResolvers<true>;

/**
 * Custom subscription field resolver that types out the resolve and subscribe
 * properties.
 * @see GraphQLField for a baseline, but we are customizing quite a bit to take
 * advantage of the withFilter function from apollo-server-express package.
 */
export type SubscriptionFieldResolverObj<
  TSource,
  TArgs = Record<string, any>,
  TReturn = any,
  TAuth = false
> = SubscriptionResolverObject<TReturn, TSource, ContextObj<TAuth>, TArgs>;

/**
 * Shortcut for authorized subscription field resolvers
 */
export type AuthSubscriptionFieldResolverObj<
  TSource,
  TArgs = Record<string, any>,
  TReturn = any
> = SubscriptionFieldResolverObj<TSource, TArgs, TReturn, true>;

//
// ----------------------------------------
// Non-generic type resolvers
//
// e.g., TripInvite (as opposed to Query)
// ----------------------------------------
//

/**
 * All of our TripInvite field resolvers, which defaults to using unauthenticated
 * context.
 */
export type TripInviteFieldResolvers<TAuth = false> = TripInviteResolvers<
  ContextObj<TAuth>
>;

/**
 * Shortcut for authenticated TripInvite field resolvers
 */
export type AuthTripInviteFieldResolvers = TripInviteFieldResolvers<true>;
