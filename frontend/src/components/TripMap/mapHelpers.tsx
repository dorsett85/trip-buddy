import React from 'react';
import TripMarker from './TripMarker';
import { TripState } from '../../store/trip/types';
import { Trip } from '../../types/trip';

/**
 * Get array of trip itinerary markers
 */
export const getTripItineraryMarkers = (trip: Trip) => {
  const markers: JSX.Element[] = [];

  // Loop through the itineraries to build markers, it's okay to assume
  // we have the itineraries property because this is checked where
  // getTripItineraryMarkers is called 
  for (let i = 0; i < trip.itineraries!.length; i += 1) {
    const itinerary = trip.itineraries![i];
    const hoverContent = (
      <>
        <div className='markerPopup-tripName'>{trip.name}</div>
        <div className='markerPopup-itineraryName'>{itinerary.name}</div>
        <div>
          <span>Date:</span>
          {' '}
          <span>{new Date(itinerary.start_time).toLocaleDateString()}</span>
        </div>
      </>
    );
    const marker = (
      <TripMarker
        key={`${trip.id}${itinerary.id}`}
        tripId={trip.id}
        markerId={+`${trip.id}${itinerary.id}`}
        location={itinerary.location}
        hoverContent={hoverContent}
      />
    );
    markers.push(marker);
  }
  return markers;
};

/**
 * Get array of trip markers
 */
export const getTripMarkers = (trips: TripState['trips']) => {
  return Object.values(trips).map(trip => {
    const hoverContent = (
      <>
        <div className='markerPopup-tripName'>{trip.name}</div>
        <div>
          <span>Date:</span>
          {' '}
          <span>{new Date(trip.start_date).toLocaleDateString()}</span>
        </div>
        <div>
          <span>Status:</span>
          {' '}
          <span>{trip.status}</span>
        </div>
      </>
    );

    return (
      <TripMarker
        key={trip.id}
        tripId={trip.id}
        markerId={trip.id}
        location={trip.location}
        hoverContent={hoverContent}
      />
    );
  });
};
