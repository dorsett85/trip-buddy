import { IFieldResolver } from 'apollo-server-express';
// eslint-disable-next-line import/no-cycle
import { ContextObj } from '../schema/context.types';
import { ChangeReturnType } from '.';

// IFieldResolver modification that puts arguments in the correct order, adds
// a context object, and allows specifying a return type.  The TAuth argument
// is to let the resolver know if the user object is available in the ContextObj
export type FieldResolver<
  TSource,
  TArgs = Record<string, any>,
  TReturn = any,
  TAuth = false
> = ChangeReturnType<IFieldResolver<TSource, ContextObj<TAuth>, TArgs>, TReturn>;

// Shortcut for authorized field resolvers
export type AuthFieldResolver<
  TSource,
  TArgs = Record<string, any>,
  TReturn = any
> = FieldResolver<TSource, TArgs, TReturn, true>;

// Resolver args that are placed within an input property
export interface InputResolverArg<T> {
  input: T;
}
