import React from 'react';
import styles from './TripMap.module.scss';
import { useMap } from './hooks';

const TripMap: React.FC = () => {
  const [map, setMap] = useMap();

  return (
    <div className={styles.mapContainer}>
      <div id='map' className={styles.map} />
    </div>
  );
};

export default TripMap;
