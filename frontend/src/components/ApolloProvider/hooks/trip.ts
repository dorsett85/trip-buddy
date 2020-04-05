import { MutationHookOptions, useMutation } from '@apollo/react-hooks';
import {
  CREATE_TRIP_MUTATION,
  UPDATE_TRIP_MUTATION,
  DELETE_TRIP_MUTATION
} from '../gql/trip';

export const useCreateTripMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation<TData>(CREATE_TRIP_MUTATION, options);

export const useUpdateTripMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation<TData>(UPDATE_TRIP_MUTATION, options);

export const useDeleteTripMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation<TData>(DELETE_TRIP_MUTATION, options);
