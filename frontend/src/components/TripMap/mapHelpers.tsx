import React from 'react';
import TripMarker from './TripMarker';
import { TripState } from '../../store/trip/types';

export const createTripMarkers = (tripIds: Array<keyof TripState['trips']>) =>
  tripIds.map(id => <TripMarker key={id} id={id} />);
