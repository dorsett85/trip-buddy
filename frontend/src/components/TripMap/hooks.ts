import { useState, useEffect } from 'react';
import { ViewState, PointerEvent, ViewportProps, FlyToInterpolator } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { setTripCreator, setActiveTripInfo } from '../../store/trip/actions';
import { getTripMarkers } from './mapHelpers';
import { LngLatArray } from '../../types/shared';
import { useActiveTrip } from '../../utils/hooks/useActiveTrip';
import { useActiveTripItineraries } from '../../utils/hooks/useActiveTripItineraries';
import { TripState } from '../../store/trip/types';
import { Trip } from '../../types/trip';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { MapboxService } from '../../api/mapbox/MapBoxService';
import { setOpenDrawer } from '../../store/general/actions';

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
  const dispatch = useAppDispatch();
  const [viewport, setViewport] = useState(initialViewport);
  const creatingTrip = useSelector(({ trip }: AppState) => !!trip.tripCreator);
  const activeTrip = useSelector(({ trip }: AppState) => trip.activeTripInfo);
  const flyTo = useSelector(({ general }: AppState) => general.flyTo);

  const updateViewport = (newViewport: ViewState) => {
    setViewport(newViewport);
  };

  const handleClick = (e: PointerEvent) => {
    // Set the location during the create trip process
    if (creatingTrip) {
      const lngLatString = e.lngLat.toString();
      MapboxService.getGeocodeFeatureCollection(lngLatString).then(featureCollection => {
        const { features } = featureCollection;
        const locationText = features.length ? features[0].place_name : lngLatString;
        dispatch(
          setTripCreator({
            openModal: true,
            location: e.lngLat,
            location_address: locationText
          })
        );
      });
      return;
    }

    // Set the new location that will be picked up in the trip panel
    if (activeTrip && activeTrip.updatingLocation) {
      dispatch(setActiveTripInfo({ newLocation: e.lngLat }));
      dispatch(setOpenDrawer(true));
      return;
    }

    // Set the new itinerary location that will be picked up in the itinerary panel
    if (activeTrip && activeTrip.updatingItineraryLocation !== undefined) {
      dispatch(setActiveTripInfo({ newItineraryLocation: e.lngLat }));
      dispatch(setOpenDrawer(true));
      return;
    }

    // Any click on the map should cancel the active trip
    if (activeTrip && e.target.classList.contains('overlays')) {
      dispatch(setActiveTripInfo());
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
  const trips = useSelector(({ trip }: AppState) => trip.trips);
  const creatingTrip = useSelector(({ trip }: AppState) => !!trip.tripCreator);
  const activeTrip = useActiveTrip();
  const itineraries = useActiveTripItineraries();
  const updatingLocation = useSelector(
    ({ trip }: AppState) =>
      !!trip.activeTripInfo &&
      (trip.activeTripInfo.updatingLocation ||
        trip.activeTripInfo.updatingItineraryLocation !== undefined ||
        !!creatingTrip)
  );
  const [tripMarkers, setTripMarkers] = useState<JSX.Element[]>([]);

  // If there's an active trip, only show that itinerary on the map,
  // otherwise show all the trips without itinerary
  useEffect(() => {
    let dataForMarkers: Trip | TripState['trips'];
    if (activeTrip) {
      dataForMarkers = {
        ...activeTrip,
        itineraries
      };
    } else {
      dataForMarkers = trips;
    }
    const markers = getTripMarkers(dataForMarkers);
    setTripMarkers(markers);
  }, [trips, activeTrip, itineraries]);

  return {
    tripMarkers,
    updatingLocation
  };
};
