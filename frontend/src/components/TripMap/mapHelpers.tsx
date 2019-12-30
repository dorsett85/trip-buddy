import React from 'react';
import TripMarker from './TripMarker';
import { TripState } from '../../store/trip/types';
import { Trip } from '../../types/trip';

/**
 * Check if an object is a trip
 */
const isTrip = (obj: TripState['trips'] | Trip): obj is Trip => 'id' in obj;

/**
 * Get array of trip markers
 */
export const getTripMarkers = (tripData: TripState['trips'] | Trip) => {
  const markers: JSX.Element[] = [];

  // If the tripData is a Trip (e.g., activeTrip) also check if we need to
  // add itineraries
  if (isTrip(tripData)) {
    markers.push(<TripMarker markerData={tripData} />);
    if (tripData.itineraries) {
      tripData.itineraries.forEach(itinerary => {
        // Only show itinerary markers that are at different locations than
        // the trip marker
        const [tripLng, tripLat] = tripData.location;
        const [itinLng, itinLat] = itinerary.location;
        if (tripLng !== itinLng || tripLat !== itinLat) {
          markers.push(<TripMarker markerData={itinerary} />);
        }
      });
    }
  } else {
    Object.values(tripData).forEach(trip => {
      markers.push(<TripMarker markerData={trip} />);
    });
  }
  return markers;
};
