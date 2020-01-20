import React from 'react';
import MapGl, { NavigationControl } from 'react-map-gl';
import { Slide } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { useMap, useMapTrips } from './hooks';
import TripCreatorModal from '../TripCreatorModal/TripCreatorModal';
import TripCreatorSnackbar from '../TripCreatorSnackbar/TripCreatorSnackbar';
import ActiveTripSnackbar from '../ActiveTripSnackbar/ActiveTripSnackbar';
import DeleteTripSnackbar from '../DeleteTripSnackbar/DeleteTripSnackbar';

interface TripMapProps {
  loggedIn: boolean;
}

interface MapContainerProps {
  updatingLocation: boolean;
}

const MapContainer = styled.div<MapContainerProps>(
  ({ updatingLocation }) => css`
    height: 100vh;
    > div > div {
      cursor: ${updatingLocation ? 'pointer' : 'inherit'};
    }
    .mapNavControl {
      position: absolute;
      top: 64px;
      left: 0;
      padding: 10px;
    }
  `
);

console.log(process.env.REACT_APP_MAPBOX_API_TOKEN)

const TripMap: React.FC<TripMapProps> = ({ loggedIn }) => {
  const { viewport, updateViewport, handleClick } = useMap();
  const { tripMarkers, updatingLocation } = useMapTrips();

  return (
    <>
      <MapContainer updatingLocation={updatingLocation}>
        <MapGl
          {...viewport}
          onViewportChange={updateViewport}
          onClick={handleClick}
          width='100%'
          height='100%'
          mapStyle='mapbox://styles/mapbox/satellite-streets-v9'
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
        >
          {tripMarkers}
          {loggedIn && (
            <Slide in direction='down'>
              <div className='mapNavControl'>
                <NavigationControl />
              </div>
            </Slide>
          )}
        </MapGl>
      </MapContainer>
      <TripCreatorModal />
      <TripCreatorSnackbar />
      <ActiveTripSnackbar />
      <DeleteTripSnackbar />
    </>
  );
};

export default TripMap;
