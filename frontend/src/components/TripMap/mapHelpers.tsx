import React from 'react';
import { TripState } from '../../store/trip/types';
import TripMarker from './TripMarker';


export const createTripMarkers = (trips: TripState['trips']) => {
  const tripMarkers: any[] = [];
  Object.keys(trips)
    .map(Number)
    .forEach(id => {
      const marker = <TripMarker key={id} trip={trips[id]} />;
      tripMarkers.push(marker);
    });
  return tripMarkers;
};
