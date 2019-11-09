import React, { useState } from 'react';
import { Marker, ViewState, PointerEvent } from 'react-map-gl';
import { useSelector } from 'react-redux';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { AppState } from '../../store';

const initialViewport: ViewState = {
  latitude: 37.785164,
  longitude: -100,
  zoom: 3.5,
  bearing: 0,
  pitch: 0
};

export const useTripMap = () => {
  const [viewport, setViewport] = useState(initialViewport);
  const { creating } = useSelector((state: AppState) => state.trip);
  const [tripMarkers, setTripMarkers] = useState([] as JSX.Element[]);

  const updateViewport = (newViewport: ViewState) => {
    setViewport(newViewport);
  };

  const handleClick = (e: PointerEvent) => {
    if (creating) {
      const [lng, lat] = e.lngLat;
      const marker = (
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
      const newMarkers = tripMarkers.concat(marker);
      setTripMarkers(newMarkers);
    }
  };

  return {
    viewport,
    updateViewport,
    handleClick,
    tripMarkers
  };
};
