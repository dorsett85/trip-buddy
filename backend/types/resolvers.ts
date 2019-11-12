import { MergeInfo } from 'apollo-server-express';
import { GraphQLResolveInfo } from 'graphql';
import { ContextObj } from '../schema/context.types';

// Shortcut type for reducing arguments, adding context object, and optional return type.
// The TAuth argument is to let the resolver know if the user object is available in the ContextObj
export type ContextFieldResolver<TArgs = any, TReturn = any, TAuth = false> = (
  source: any,
  args: TArgs,
  context: ContextObj<TAuth>,
  info: GraphQLResolveInfo & {
    mergeInfo: MergeInfo;
  }
) => TReturn;

// Shortcut for authorized field resolvers
export type ContextAuthFieldResolver<TArgs = any, TReturn = any> = ContextFieldResolver<
  TArgs,
  TReturn,
  true
>;
