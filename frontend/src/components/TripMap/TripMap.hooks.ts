import { useState, useEffect } from 'react';
import { ViewState, PointerEvent } from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import { setTripCreator } from '../../store/trip/actions';
import { createTripMarkers } from './mapHelpers';

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
  const creatingTrip = useSelector(({ trip }: AppState) => !!trip.tripCreator);

  const updateViewport = (newViewport: ViewState) => {
    setViewport(newViewport);
  };

  const handleClick = (e: PointerEvent) => {
    if (creatingTrip) {
      dispatch(
        setTripCreator({
          openModal: true,
          start_location: e.lngLat
        })
      );
    }
  };

  return {
    viewport,
    updateViewport,
    handleClick
  };
};

export const useMarkers = () => {
  const trips = useSelector((state: AppState) => state.trip.trips);
  const [tripMarkers, setTripMarkers] = useState([] as JSX.Element[]);

  useEffect(() => {
    const markers = createTripMarkers(trips);
    setTripMarkers(markers);
  }, [trips])

  return {
    tripMarkers
  }
}
