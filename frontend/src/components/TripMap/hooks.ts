import { useState, useEffect } from 'react';
import { ViewState, PointerEvent, ViewportProps, FlyToInterpolator } from 'react-map-gl';
import { LngLatArray } from 'common/lib/types/utils';
import {
  setTripCreator,
  setActiveTripInfo,
  setTripItineraries,
  setTripItineraryCreator
} from '../../store/trip/reducer';
import { getTripMarkers } from './mapHelpers';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { MapboxService } from '../../api/mapbox/MapBoxService';
import { setDrawer, setFlyTo } from '../../store/general/reducer';
import {
  useTripItineraries,
  useTrips,
  useActiveTripInfo,
  useActiveTrip
} from '../../store/hooks/useTrip';
import { useAppSelector } from '../../store/hooks/useAppSelector';

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
  const creatingTrip = useAppSelector(({ trip }) => !!trip.creator);
  const creatingItinerary = useAppSelector(({ trip }) => !!trip.itineraryCreator);
  const activeTripInfo = useActiveTripInfo();
  const flyTo = useAppSelector(({ general }) => general.flyTo);

  const updateViewport = (newViewport: ViewState) => {
    //  Reset the fly to store in case the user tries to fly back to the same
    // trip/itinerary after the viewport changes
    if (flyTo) {
      dispatch(setFlyTo(undefined));
    }
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

    // Set the location during the create itinerary process
    if (creatingItinerary) {
      const lngLatString = e.lngLat.toString();
      MapboxService.getGeocodeFeatureCollection(lngLatString).then(featureCollection => {
        const { features } = featureCollection;
        const locationText = features.length ? features[0].place_name : lngLatString;
        dispatch(
          setTripItineraryCreator({
            location: e.lngLat,
            location_address: locationText
          })
        );
        dispatch(setDrawer({ open: true }));
      });
      return;
    }

    // Set the new location that will be picked up in the trip panel
    if (activeTripInfo && activeTripInfo.updatingLocation) {
      dispatch(setActiveTripInfo({ newLocation: e.lngLat }));
      dispatch(setDrawer({ open: true }));
      return;
    }

    // Set the new itinerary location that will be picked up in the itinerary panel
    if (activeTripInfo && activeTripInfo.updatingItineraryLocationId !== undefined) {
      dispatch(setActiveTripInfo({ newItineraryLocation: e.lngLat }));
      dispatch(setDrawer({ open: true }));
      return;
    }

    // Any click on the map should cancel the active trip
    if (activeTripInfo && e.target.classList.contains('overlays')) {
      dispatch(setActiveTripInfo());
      dispatch(setTripItineraries());
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
  const creatingTrip = useAppSelector(({ trip }) => !!trip.creator);
  const creatingItinerary = useAppSelector(({ trip }) => !!trip.itineraryCreator);
  const activeTrip = useActiveTrip();
  const itineraries = useTripItineraries();
  const updatingLocation = useAppSelector(
    ({ trip }) =>
      creatingTrip ||
      (!!trip.activeTripInfo &&
        (trip.activeTripInfo.updatingLocation ||
          trip.activeTripInfo.updatingItineraryLocationId !== undefined ||
          creatingItinerary))
  );
  const [tripMarkers, setTripMarkers] = useState<JSX.Element[]>([]);

  // Update the markers when the trips or itineraries change.  If there are
  // keys in the itineraries it means there is an activeTrip
  useEffect(() => {
    const tripData = activeTrip ? { [activeTrip.id]: activeTrip } : trips;
    const markers = getTripMarkers(tripData, itineraries);
    setTripMarkers(markers);
  }, [trips, itineraries, activeTrip]);

  return {
    tripMarkers,
    updatingLocation
  };
};
