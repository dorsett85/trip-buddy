import React, { useState } from 'react';
import MapGl, { NavigationControl, ViewState, PointerEvent, Marker } from 'react-map-gl';
import { Slide } from '@material-ui/core';
import { useSelector } from 'react-redux';
import styles from './TripMap.module.scss';
import { AppState } from '../../store';

const MAPBOX_API_TOKEN =
  'pk.eyJ1IjoiZG9yc2V0dDg1IiwiYSI6ImNqcHppM204MDBjYmozeHIxazF3NnBqNXkifQ.9sZzzAFl48z9rBc9s1LTEQ';

const initialViewport: ViewState = {
  latitude: 37.785164,
  longitude: -100,
  zoom: 3.5,
  bearing: 0,
  pitch: 0
};

const TripMap: React.FC = () => {
  const { isLoggedIn } = useSelector((state: AppState) => state.user);
  const { creatingTrip } = useSelector((state: AppState) => state.trip);
  const [marker, setMarker] = useState(null as any);
  const [viewport, setViewport] = useState(initialViewport);

  const updateViewport = (newViewport: ViewState) => {
    setViewport(newViewport);
  };

  const handleClick = (e: PointerEvent) => {
    if (creatingTrip) {
      const [lng, lat] = e.lngLat;
      const marker = (
        <Marker longitude={lng} latitude={lat}>
          NEW MARKER
        </Marker>
      );
      setMarker(marker);
    }
  };

  return (
    <div className={styles.mapContainer}>
      <MapGl
        {...viewport}
        width='100%'
        height='100%'
        mapStyle='mapbox://styles/mapbox/satellite-streets-v9'
        onClick={handleClick}
        onViewportChange={updateViewport}
        mapboxApiAccessToken={MAPBOX_API_TOKEN}
      >
        {marker}
        {isLoggedIn && (
          <Slide in direction='down'>
            <div className={styles.mapNavControl}>
              <NavigationControl />
            </div>
          </Slide>
        )}
      </MapGl>
    </div>
  );
};

export default TripMap;
