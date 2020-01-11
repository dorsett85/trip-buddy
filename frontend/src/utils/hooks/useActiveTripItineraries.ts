import { useSelector } from 'react-redux';
import { AppState } from '../../store';

/**
 * Convenience hook for accessing the active trip itineraries
 */
export const useActiveTripItineraries = () =>
  useSelector(
    (state: AppState) =>
      state.trip.activeTrip && state.trip.activeTrip.itineraries
  );
