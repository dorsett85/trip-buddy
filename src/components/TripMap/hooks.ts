import { useEffect, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZG9yc2V0dDg1IiwiYSI6ImNqcHppM204MDBjYmozeHIxazF3NnBqNXkifQ.9sZzzAFl48z9rBc9s1LTEQ';

export const useMap = () => {
  const [map, setMap] = useState();

  // Load the initial map
  useEffect(() => {
    if (!map) {
      const newMap: Map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v9',
        center: [-50, 20], // starting position [lng, lat]
        zoom: 2 // starting zoom
      });
      setMap(newMap);
    }
  }, [map]);
  return [map, setMap];
};
