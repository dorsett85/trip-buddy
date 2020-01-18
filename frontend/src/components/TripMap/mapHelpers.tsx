import React, { FunctionComponentElement } from 'react';
import TripMarker, { TripMarkerProps } from './TripMarker';
import { TripState } from '../../store/trip/types';
import TripMarkerPopup, { TripItineraryWithPosition } from './TripMarkerPopup';

/**
 * Get array of trip markers
 */
export const getTripMarkers = (
  trips: TripState['trips'],
  itineraries: TripState['itineraries']
) => {
  const markers: FunctionComponentElement<TripMarkerProps>[] = [];

  // Add the trip markers
  Object.values(trips).forEach(trip => {
    markers.push(
      <TripMarker
        key={trip.id}
        markerData={trip}
        popup={<TripMarkerPopup popupData={trip} />}
      />
    );
  });

  // Add the trip itinerary markers
  Object.values(itineraries).forEach((itinerary, index) => {
    // Only show itinerary markers that are at different locations than
    // the trip marker
    const [tripLng, tripLat] = trips[itinerary.trip_id].location;
    const [itinLng, itinLat] = itinerary.location;
    if (tripLng !== itinLng || tripLat !== itinLat) {
      const itineryaryWithPosition: TripItineraryWithPosition = {
        position: index + 1,
        ...itinerary
      };
      markers.push(
        <TripMarker
          key={`${itinerary.trip_id}-${itinerary.id}`}
          markerData={itinerary}
          popup={<TripMarkerPopup popupData={itineryaryWithPosition} />}
        />
      );
    }
  });

  return markers;
};
