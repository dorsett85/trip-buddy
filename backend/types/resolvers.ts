import { MergeInfo } from 'apollo-server-express';
import { GraphQLResolveInfo } from 'graphql';
// eslint-disable-next-line import/no-cycle
import { ContextObj } from '../schema/context.types';

// Shortcut type for reducing arguments, adding context object, and optional return type
export type ContextFieldResolver<TArgs = any, TReturn = any> = (
  source: any,
  args: TArgs,
  context: ContextObj,
  info: GraphQLResolveInfo & {
    mergeInfo: MergeInfo;
  }
) => TReturn;

export type IsAuthenticatedResolver<TArgs = any, TReturn = any> = (
  next: ContextFieldResolver<TArgs, TReturn>
) => ContextFieldResolver<TArgs, TReturn>;
