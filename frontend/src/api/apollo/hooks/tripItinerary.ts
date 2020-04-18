import { MutationHookOptions, useMutation, useQuery } from '@apollo/react-hooks';
import { QueryHookOptions } from '@apollo/react-hooks/lib/types';
import {
  CREATE_TRIP_ITINERARY_MUTATION,
  DELETE_TRIP_ITINERARY_MUTATION,
  GET_TRIP_ITINERARIES_QUERY,
  UPDATE_TRIP_ITINERARY_MUTATION
} from '../gql/tripItinerary';

export const useGetTripItinerariesQuery = <TData = any>(
  options?: QueryHookOptions<TData>
) => useQuery<TData>(GET_TRIP_ITINERARIES_QUERY, options);

export const useCreateTripItineraryMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation<TData>(CREATE_TRIP_ITINERARY_MUTATION, options);

export const useUpdateTripItineraryMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation<TData>(UPDATE_TRIP_ITINERARY_MUTATION, options);

export const useDeleteTripItineraryMutation = <TData = any>(
  options?: MutationHookOptions<TData>
) => useMutation<TData>(DELETE_TRIP_ITINERARY_MUTATION, options);
