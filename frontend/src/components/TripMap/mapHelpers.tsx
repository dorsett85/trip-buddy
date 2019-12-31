import React, { FunctionComponentElement } from 'react';
import TripMarker, { TripMarkerProps } from './TripMarker';
import { TripState } from '../../store/trip/types';
import { Trip } from '../../types/trip';
import { isTrip } from '../../utils/isTrip';
import TripMarkerPopup, { TripItineraryWithIndex } from './TripMarkerPopup';

/**
 * Get array of trip markers
 */
export const getTripMarkers = (tripData: TripState['trips'] | Trip) => {
  const markers: FunctionComponentElement<TripMarkerProps>[] = [];

  // If the tripData is a Trip (e.g., activeTrip) also check if we need to
  // add itineraries
  if (isTrip(tripData)) {
    markers.push(
      <TripMarker
        key={tripData.id}
        markerData={tripData}
        popup={<TripMarkerPopup popupData={tripData} />}
      />
    );
    if (tripData.itineraries) {
      tripData.itineraries.forEach((itinerary, idx) => {
        // Only show itinerary markers that are at different locations than
        // the trip marker
        const [tripLng, tripLat] = tripData.location;
        const [itinLng, itinLat] = itinerary.location;
        if (tripLng !== itinLng || tripLat !== itinLat) {
          const itineryaryWithIdx: TripItineraryWithIndex = {
            idx: idx + 1,
            ...itinerary
          };
          markers.push(
            <TripMarker
              key={`${tripData.id}-${itinerary.id}`}
              markerData={itinerary}
              popup={<TripMarkerPopup popupData={itineryaryWithIdx} />}
            />
          );
        }
      });
    }
  } else {
    Object.values(tripData).forEach(trip => {
      markers.push(
        <TripMarker
          key={trip.id}
          markerData={trip}
          popup={<TripMarkerPopup popupData={trip} />}
        />
      );
    });
  }
  return markers;
};
