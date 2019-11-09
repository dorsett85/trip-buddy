import { useState } from 'react';
import { ViewState, PointerEvent } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { createMarker } from './mapHelpers';

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
      const marker = createMarker(e);
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
