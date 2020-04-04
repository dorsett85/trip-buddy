import {
  LazyQueryHookOptions,
  MutationHookOptions,
  useLazyQuery,
  useMutation
} from '@apollo/react-hooks';
import { GET_LOGGED_IN_DATA, UPDATE_USER, VERIFY_EMAIL } from '../gql/user';

export const useLoggedInQuery = <TData = any>(options?: LazyQueryHookOptions<TData>) =>
  useLazyQuery(GET_LOGGED_IN_DATA, options);

export const useUpdateUserMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation(UPDATE_USER, options);

export const useVerifyEmailMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation(VERIFY_EMAIL, options);
