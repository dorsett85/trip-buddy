import { useState, useEffect } from 'react';
import { ViewState, PointerEvent, ViewportProps, FlyToInterpolator } from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import { setTripCreator, setActiveTrip } from '../../store/trip/actions';
import { getTripMarkers } from './mapHelpers';
import { LngLatArray } from '../../types/shared';

const initialViewport: Partial<ViewportProps> = {
  latitude: 37.785164,
  longitude: -100,
  zoom: 3.5,
  bearing: 0,
  pitch: 0
};

const transitionInterpolator = new FlyToInterpolator();

const flyToViewport = (lngLat: LngLatArray) => (
  viewport: Partial<ViewportProps>
): Partial<ViewportProps> => {
  const [longitude, latitude] = lngLat;
  return {
    ...viewport,
    longitude,
    latitude,
    transitionDuration: 500,
    transitionInterpolator
  };
};

export const useTripMap = () => {
  const dispatch = useDispatch();
  const [viewport, setViewport] = useState(initialViewport);
  const creatingTrip = useSelector(({ trip }: AppState) => !!trip.tripCreator);
  const activeTrip = useSelector((state: AppState) => state.trip.activeTrip);
  const flyTo = useSelector((state: AppState) => state.general.flyTo);

  const updateViewport = (newViewport: ViewState) => {
    setViewport(newViewport);
  };

  const handleClick = (e: PointerEvent) => {
    // Set the lngLat during the create trip process
    if (creatingTrip) {
      dispatch(
        setTripCreator({
          openModal: true,
          location: e.lngLat
        })
      );
    }

    // Any click on the map should cancel the active trip
    if (activeTrip && e.target.classList.contains('overlays')) {
      dispatch(setActiveTrip(undefined));
    }
  };

  // Viewport shift when flyTo changes
  useEffect(() => {
    if (flyTo) {
      setViewport(flyToViewport(flyTo));
    }
  }, [flyTo]);

  return {
    viewport,
    updateViewport,
    handleClick
  };
};

export const useTrips = () => {
  const trips = useSelector((state: AppState) => state.trip.trips);
  const creatingTrip = useSelector((state: AppState) => !!state.trip.tripCreator);
  const activeTrip = useSelector((state: AppState) => state.trip.activeTrip);
  const [tripMarkers, setTripMarkers] = useState<JSX.Element[]>([]);

  // If there's an active trip, only show that itinerary on the map,
  // otherwise show all the trips without itinerary
  useEffect(() => {
    const markers = getTripMarkers(activeTrip || trips);
    setTripMarkers(markers);
  }, [trips, activeTrip]);

  return {
    creatingTrip,
    tripMarkers
  };
};
