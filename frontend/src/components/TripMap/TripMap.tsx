import React from 'react';
import MapGl, { NavigationControl } from 'react-map-gl';
import { Slide } from '@material-ui/core';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../../store';
import { useTripMap } from './TripMap.hooks';
import TripMapModal from './CreateTripModal';
import { createTripMarkers } from './mapHelpers';

const MapContainer = styled.div`
  height: 100vh;
  .mapNavControl {
    position: absolute;
    top: 64px;
    left: 0;
    padding: 10px;
  }
`;

const TripMap: React.FC = () => {
  const loggedIn = useSelector((state: AppState) => state.user.loggedIn);
  const trips = useSelector((state: AppState) => state.trip.trips);
  const { viewport, updateViewport, handleClick, tripMarkers } = useTripMap();
  const initialMarkers = createTripMarkers(trips);
  return (
    <>
      <MapContainer>
        <MapGl
          {...viewport}
          width='100%'
          height='100%'
          mapStyle='mapbox://styles/mapbox/satellite-streets-v9'
          onClick={handleClick}
          onViewportChange={updateViewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
        >
          {initialMarkers}
          {loggedIn && (
            <Slide in direction='down'>
              <div className='mapNavControl'>
                <NavigationControl />
              </div>
            </Slide>
          )}
        </MapGl>
      </MapContainer>
      <TripMapModal />
    </>
  );
};

export default TripMap;
