import { useState, useEffect } from 'react';
import { ViewState, PointerEvent, ViewportProps, FlyToInterpolator } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { setTripCreator, setActiveTripInfo } from '../../store/trip/actions';
import { getTripMarkers } from './mapHelpers';
import { LngLatArray } from '../../types/shared';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { MapboxService } from '../../api/mapbox/MapBoxService';
import { setOpenDrawer } from '../../store/general/actions';
import {
  useTripItineraries,
  useTrips,
  useActiveTripInfo
} from '../../utils/hooks/useTrip';

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

export const useMap = () => {
  const dispatch = useAppDispatch();
  const [viewport, setViewport] = useState(initialViewport);
  const creatingTrip = useSelector(({ trip }: AppState) => !!trip.tripCreator);
  const activeTripInfo = useActiveTripInfo();
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
    if (activeTripInfo && activeTripInfo.updatingLocation) {
      dispatch(setActiveTripInfo({ newLocation: e.lngLat }));
      dispatch(setOpenDrawer(true));
      return;
    }

    // Set the new itinerary location that will be picked up in the itinerary panel
    if (activeTripInfo && activeTripInfo.updatingItineraryLocation !== undefined) {
      dispatch(setActiveTripInfo({ newItineraryLocation: e.lngLat }));
      dispatch(setOpenDrawer(true));
      return;
    }

    // Any click on the map should cancel the active trip
    if (activeTripInfo && e.target.classList.contains('overlays')) {
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

export const useMapTrips = () => {
  const trips = useTrips();
  const creatingTrip = useSelector(({ trip }: AppState) => !!trip.tripCreator);
  const itineraries = useTripItineraries();
  const updatingLocation = useSelector(
    ({ trip }: AppState) =>
      !!trip.activeTripInfo &&
      (trip.activeTripInfo.updatingLocation ||
        trip.activeTripInfo.updatingItineraryLocation ||
        creatingTrip)
  );
  const [tripMarkers, setTripMarkers] = useState<JSX.Element[]>([]);

  // Update the markers when the trips or itineraries change.  If there are
  // keys in the itineraries it means there is an activeTrip
  useEffect(() => {
    const markers = getTripMarkers(trips, itineraries);
    setTripMarkers(markers);
  }, [trips, itineraries]);

  return {
    tripMarkers,
    updatingLocation
  };
};
