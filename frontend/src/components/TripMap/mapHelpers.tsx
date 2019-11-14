import React from 'react';
import { PointerEvent, Marker } from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { TripState } from '../../store/trip/types';

export const createMarker = (e: PointerEvent) => {
  const [lng, lat] = e.lngLat;

  return (
    <Marker
      key={`${lng}-${lat}`}
      longitude={lng}
      latitude={lat}
      offsetLeft={-12}
      offsetTop={-12}
    >
      <LocationOnIcon color='secondary' />
    </Marker>
  );
};

export const createTripMarkers = (trips: TripState['trips']) => {
  const tripMarkers: any[] = [];
  Object.keys(trips).map(Number).forEach(id => {
    const { start_location: [lng, lat] } = trips[id];
    const marker = (
      <Marker
        key={id}
        longitude={lng}
        latitude={lat}
        offsetLeft={-12}
        offsetTop={-12}
      >
        <LocationOnIcon color='secondary' />
      </Marker>
    );
    tripMarkers.push(marker);
  })
  return tripMarkers;
};