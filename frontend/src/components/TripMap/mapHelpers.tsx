import React from 'react';
import TripMarker from './TripMarker';
import { TripState } from '../../store/trip/types';
import { Trip } from '../../types/trip';

/**
 * Get array of trip leg markers
 *
 * This will get an array of trip leg markers with an optional argument
 * to only get the first trip leg if "all" is set to false
 */
export const getTripLegsMarkers = (trip: Trip, all = true) => {
  const markers: JSX.Element[] = [];
  for (let i = 0; i < trip.legs.length; i += 1) {
    const leg = trip.legs[i];
    const marker = (
      <TripMarker
        key={leg.id}
        tripId={trip.id}
        tripLegId={leg.id}
        tripName={trip.name}
        tripLegName={leg.name}
        status={trip.status}
        location={leg.location}
        dateTime={leg.date_time}
      />
    );
    markers.push(marker);

    // Only get the first leg marker if all if false
    if (!all) {
      break;
    }
  }
  return markers;
};

/**
 * Get array of trip markers
 *
 * This will get an array of trip markers (default is to get only the first leg of each trip).
 * Set the "allLegs" argument to true if you want to show all legs for all trips
 */
export const getTripMarkers = (trips: TripState['trips'], allLegs = false) => {
  return Object.values(trips)
    .map(trip => getTripLegsMarkers(trip, allLegs))
    .flat();
};
