import { useSelector } from 'react-redux';
import { AppState } from '../../store';

/**
 * Convenience hook for accessing the active trip info itineraries
 */
export const useActiveTripItineraries = () =>
  useSelector(
    ({ trip }: AppState) => trip.activeTripInfo && trip.activeTripInfo.itineraries
  );
