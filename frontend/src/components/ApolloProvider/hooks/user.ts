import {
  LazyQueryHookOptions,
  MutationHookOptions,
  useLazyQuery,
  useMutation
} from '@apollo/react-hooks';
import {
  GET_LOGGED_IN_DATA_QUERY,
  GET_POSSIBLE_TRIP_INVITEES_QUERY,
  LOGIN_USER_MUTATION,
  REGISTER_USER_MUTATION,
  UPDATE_USER_MUTATION,
  VERIFY_EMAIL_MUTATION
} from '../gql/user';

export const useLoginUserMutation = <TData = any>(options?: MutationHookOptions<TData>) =>
  useMutation<TData>(LOGIN_USER_MUTATION, options);

export const useRegisterUserMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation<TData>(REGISTER_USER_MUTATION, options);

export const useLoggedInQuery = <TData = any>(options?: LazyQueryHookOptions<TData>) =>
  useLazyQuery<TData>(GET_LOGGED_IN_DATA_QUERY, options);

export const useUpdateUserMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation<TData>(UPDATE_USER_MUTATION, options);

export const useVerifyEmailMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation<TData>(VERIFY_EMAIL_MUTATION, options);

export const useGetPossibleTripInviteesQuery = <TData = any>(
  options?: LazyQueryHookOptions<TData>
) => useLazyQuery<TData>(GET_POSSIBLE_TRIP_INVITEES_QUERY, options);
