import { useAppSelector } from './useAppSelector';

// Convenience hooks for accessing state on the trip store

export const useTrips = () => useAppSelector(({ trip }) => trip.trips);

export const useActiveTripId = () =>
  useAppSelector(({ trip }) => trip.activeTripInfo && trip.activeTripInfo.id);

export const useActiveTrip = () => {
  const trips = useTrips();
  const activeTripId = useActiveTripId();
  return activeTripId ? trips[activeTripId] : undefined;
};

export const useActiveTripInfo = () => useAppSelector(({ trip }) => trip.activeTripInfo);

export const useTripItineraries = () => useAppSelector(({ trip }) => trip.itineraries);
