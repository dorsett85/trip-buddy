import { LazyQueryHookOptions, useLazyQuery } from '@apollo/react-hooks';
import { GET_LOGGED_IN_DATA } from '../gql/user';

/*
 * User
 */

export const useLoggedInQuery = <TData = any>(options?: LazyQueryHookOptions<TData>) =>
  useLazyQuery(GET_LOGGED_IN_DATA, options);
