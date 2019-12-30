import React, { useState, memo } from 'react';
import { Marker } from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import styled from 'styled-components';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTrip, setActiveMarker } from '../../store/trip/actions';
import { AppState } from '../../store';
import { setOpenDrawer } from '../../store/general/actions';
import { Trip, TripItinerary } from '../../types/trip';
import TripMarkerPopup from './TripMarkerPopup';

export interface TripMarkerProps {
  /**
   * Data for the trip marker
   */
  markerData: Trip | TripItinerary;
  /**
   * What icon to display for the marker.
   * TODO this currently only allows Svg icons from the
   * material ui library.  Should we make it more flexible??
   */
  Icon?: React.ComponentType<SvgIconProps>;
}

/**
 * Check that the marker data is a Trip or not
 */
const isTrip = (obj: Trip | TripItinerary): obj is Trip => !('trip_id' in obj);

const IconWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.25s;
  &.active {
    transform: scale(1.5);
  }
`;

const TripMarker: React.FC<TripMarkerProps> = ({ markerData, Icon = LocationOnIcon }) => {
  const dispatch = useDispatch();
  const activeMarker = useSelector(
    (state: AppState) => state.trip.activeTrip && state.trip.activeTrip.activeMarker
  );
  const [showHoverPopup, setShowHoverPopup] = useState(false);

  const markerId = isTrip(markerData)
    ? `${markerData.id}`
    : `${markerData.trip_id}-${markerData.id}`;
  const isActive = activeMarker === markerId;
  const [lng, lat] = markerData.location;

  const handleHover = ({ type }: React.MouseEvent) => {
    setShowHoverPopup(type === 'mouseenter');
  };

  const handleClick = () => {
    if (!isActive) {
      const activeTripId = isTrip(markerData) ? markerData.id : markerData.trip_id;
      dispatch(setActiveTrip(activeTripId));
    }
    dispatch(setActiveMarker(markerId));
    dispatch(setOpenDrawer(true));
  };

  return (
    <>
      <Marker longitude={lng} latitude={lat} offsetLeft={-12} offsetTop={-12}>
        <IconWrapper className={`${isActive ? 'active' : ''}`}>
          <Icon
            onClick={handleClick}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            color='secondary'
          />
        </IconWrapper>
      </Marker>
      {showHoverPopup && <TripMarkerPopup popupData={markerData} />}
    </>
  );
};

export default memo(TripMarker);
