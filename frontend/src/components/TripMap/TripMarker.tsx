import React, { useState, memo, FunctionComponentElement } from 'react';
import { Marker } from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import styled from 'styled-components';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { setActiveTripInfo } from '../../store/trip/reducer';
import { setDrawer } from '../../store/general/reducer';
import { Trip, TripItinerary } from '../../types/trip';
import { isTrip } from '../../utils/isTrip';
import { TripMarkerPopupProps } from './TripMarkerPopup';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { useAppSelector } from '../../store/hooks/useAppSelector';

export interface TripMarkerProps {
  /**
   * Data for the trip marker
   */
  markerData: Trip | TripItinerary;
  /**
   * Popup for the marker
   */
  popup?: FunctionComponentElement<TripMarkerPopupProps>;
  /**
   * What icon to display for the marker.
   * TODO this currently only allows Svg icons from the
   * material ui library.  Should we make it more flexible??
   */
  Icon?: React.ComponentType<SvgIconProps>;
}

const IconWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.25s;
  &.active {
    transform: scale(1.5);
  }
`;

const TripMarker: React.FC<TripMarkerProps> = ({
  markerData,
  popup,
  Icon = LocationOnIcon
}) => {
  const dispatch = useAppDispatch();
  const activeMarker = useAppSelector(
    ({ trip }) => trip.activeTripInfo && trip.activeTripInfo.activeMarker
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
      dispatch(setActiveTripInfo({ id: activeTripId, activeMarker: markerId }));
    }
    dispatch(setDrawer({ open: true, content: 'trip' }));
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
      {showHoverPopup && popup}
    </>
  );
};

export default memo(TripMarker);
