import { useState } from 'react';
import { ViewState, PointerEvent } from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import { createMarker } from './mapHelpers';
import { setCreateTrip } from '../../store/trip/actions';

const initialViewport: ViewState = {
  latitude: 37.785164,
  longitude: -100,
  zoom: 3.5,
  bearing: 0,
  pitch: 0
};

export const useTripMap = () => {
  const dispatch = useDispatch();
  const [viewport, setViewport] = useState(initialViewport);
  const createTrip = useSelector(({ trip }: AppState) => trip.createTrip);
  const [tripMarkers, setTripMarkers] = useState([] as JSX.Element[]);

  const updateViewport = (newViewport: ViewState) => {
    setViewport(newViewport);
  };

  const handleClick = (e: PointerEvent) => {
    if (createTrip) {
      dispatch(
        setCreateTrip({
          openModal: true,
          start_location: e.lngLat,
          end_location: e.lngLat
        })
      );
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
