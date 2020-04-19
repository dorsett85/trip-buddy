import { withFilter } from 'apollo-server-express';
import { ChangeReturnType } from '../types';
import { FieldResolver } from '../schema/types/resolvers';

/**
 * Strongly typed wrapper for withFilter function. Type T can only be
 * a field resolver, but we change the return type for each one of our
 * withFilter arguments so the callback function is typed out.
 */
export const subscribeWithFilter = <T extends FieldResolver<any, any, any, any>>(
  asyncIteratorFc: ChangeReturnType<T, AsyncIterator<any>>,
  filterFn: ChangeReturnType<T, boolean | Promise<boolean>>
) => {
  return withFilter(asyncIteratorFc, filterFn);
};
