import React from 'react';
import { PointerEvent, Marker } from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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
