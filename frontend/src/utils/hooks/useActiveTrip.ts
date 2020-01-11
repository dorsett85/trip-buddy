import { useSelector } from 'react-redux';
import { AppState } from '../../store';

/**
 * Convenience hook for accessing the active trip
 */
export const useActiveTrip = () =>
  useSelector(
    (state: AppState) =>
      state.trip.activeTrip && state.trip.trips[state.trip.activeTrip.id]
  );
