import { IFieldResolver } from 'apollo-server-express';
import { ContextObj } from './contextObj';
import { ChangeReturnType } from '../../types';

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
 * Enclose a type with an object with an input property. This is used for resolver
 * args that have an input property to align with the graphql schema.
 */
export interface InputResolverArg<T> {
  input: T;
}

/**
 * Custom subscription field resolver that types out the resolve and subscribe
 * properties.
 * @see GraphQLField for a baseline, but we are customizing quite a bit to take
 * advantage of the withFilter function from apollo-server-express package.
 */
export interface SubscriptionFieldResolverObj<
  TSource,
  TArgs = Record<string, any>,
  TReturn = any,
  TAuth = false
> {
  resolve: FieldResolver<TSource, TArgs, TReturn, TAuth>;
  subscribe: FieldResolver<TSource, TArgs, any, TAuth>;
}

/**
 * Shortcut for authorized subscription field resolvers
 */
export type AuthSubscriptionFieldResolverObj<
  TSource,
  TArgs = Record<string, any>,
  TReturn = any
> = SubscriptionFieldResolverObj<TSource, TArgs, TReturn, true>;
