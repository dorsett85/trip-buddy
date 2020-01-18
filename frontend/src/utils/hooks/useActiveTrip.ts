import { useSelector } from 'react-redux';
import { AppState } from '../../store';

/**
 * Convenience hook for accessing the active trip
 */
export const useActiveTrip = () =>
  useSelector(
    ({ trip }: AppState) => trip.activeTripInfo && trip.trips[trip.activeTripInfo.id]
  );
