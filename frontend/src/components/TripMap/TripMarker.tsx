import React from 'react';
import { Marker } from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Trip } from '../../types/trip';

export interface TripMarkerProps {
  trip: Trip;
  Icon?: React.ComponentType<any>;
}

const TripMarker: React.FC<TripMarkerProps> = ({ trip, Icon = LocationOnIcon }) => {
  const {
    id,
    start_location: [lng, lat]
  } = trip;

  return (
    <Marker key={id} longitude={lng} latitude={lat} offsetLeft={-12} offsetTop={-12}>
      <Icon color='secondary' />
    </Marker>
  );
};

export default TripMarker;
