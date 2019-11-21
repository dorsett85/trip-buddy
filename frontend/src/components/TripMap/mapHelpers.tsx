import React from 'react';
import TripMarker from './TripMarker';
import { TripState } from '../../store/trip/types';
import { Trip } from '../../types/trip';

/**
 * Get array of trip markers
 * 
 * This will get an array of trip markers for the first leg ONLY.  Once a
 * user clicks on the marker, the rest of the trip leg markers will appear
 */
export const getTripMarkers = (trips: TripState['trips']) => {
  return Object.keys(trips).map(key => {
    const trip = trips[(key as unknown) as keyof TripState['trips']];
    return <TripMarker key={trip.id} tripId={trip.id} tripLegId={0} />;
  });
};

/**
 * Get array of trip leg markers
 * 
 * This will get an array of markers for a given trip
 */
export const getTripLegsMarkers = (trip: Trip) =>
  trip.legs.map(leg => <TripMarker key={leg.id} tripId={trip.id} tripLegId={leg.id} />);
