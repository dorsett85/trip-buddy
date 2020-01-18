import { useSelector } from 'react-redux';
import { AppState } from '../../store';

// Convenience hooks for accessing state on the trip store

export const useTrips = () => useSelector(({ trip }: AppState) => trip.trips);

export const useActiveTripId = () =>
  useSelector(({ trip }: AppState) => trip.activeTripInfo && trip.activeTripInfo.id);

export const useActiveTrip = () => {
  const trips = useTrips();
  const activeTripId = useActiveTripId();
  return activeTripId ? trips[activeTripId] : undefined;
};

export const useActiveTripInfo = () =>
  useSelector(({ trip }: AppState) => trip.activeTripInfo);

export const useTripItineraries = () =>
  useSelector(({ trip }: AppState) => trip.itineraries);
