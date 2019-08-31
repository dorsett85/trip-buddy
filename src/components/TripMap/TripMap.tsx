import React, { useState } from 'react';
import MapGl, { FullscreenControl, NavigationControl, ViewportProps } from 'react-map-gl';
import styles from './TripMap.module.scss';

const MAPBOX_API_TOKEN =
  'pk.eyJ1IjoiZG9yc2V0dDg1IiwiYSI6ImNqcHppM204MDBjYmozeHIxazF3NnBqNXkifQ.9sZzzAFl48z9rBc9s1LTEQ';

const initialViewport: Partial<ViewportProps> = {
  latitude: 37.785164,
  longitude: -100,
  zoom: 3.5,
  bearing: 0,
  pitch: 0
};

const TripMap: React.FC = () => {
  const [viewport, setViewport] = useState(initialViewport);

  const updateViewport = (newViewport: Partial<ViewportProps>) => {
    setViewport(newViewport)
  }

  return (
    <div className={styles.mapContainer}>
      <MapGl
        {...viewport}
        width='100%'
        height='100%'
        mapStyle='mapbox://styles/mapbox/satellite-streets-v9'
        onViewportChange={updateViewport}
        mapboxApiAccessToken={MAPBOX_API_TOKEN}
      >
        <div className={styles.mapFullscreenControl}>
          <FullscreenControl />
        </div>
        <div className={styles.mapNavControl}>
          <NavigationControl />
        </div>
      </MapGl>
    </div>
  );
};

export default TripMap;
