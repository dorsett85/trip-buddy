import React, { useState, memo } from 'react';
import { Marker, Popup } from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import styled from 'styled-components';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTrip, setActiveMarker } from '../../store/trip/actions';
import { AppState } from '../../store';
import { setOpenDrawer } from '../../store/general/actions';
import { Trip, TripLeg } from '../../types/trip';

export interface TripMarkerProps {
  /**
   * Used when clicking on a marker to set the activeTrip
   */
  tripId: Trip['id'];
  /**
   * Used to know which activeTrip marker is active
   */
  tripLegId: TripLeg['id'];
  /**
   * Used for hover display
   */
  tripName: Trip['name'];
  /**
   * Used for hover display
   */
  tripLegName: TripLeg['name'];
  /**
   * Used for hover display
   */
  status: Trip['status'];
  /**
   * Used to know where place the marker on the map
   */
  location: TripLeg['location'];
  /**
   * Used for hover display
   */
  dateTime: TripLeg['date_time'];
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

const PopupStyled = styled(Popup)`
  z-index: 1;
  .markerPopup-tripName,
  .markerPopup-legName {
    text-align: center;
  }
  .markerPopup-tripName {
    font-size: 1.25rem;
    font-weight: bold;
  }
  .markerPopup-legName {
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: gray;
  }
`;

const TripMarker: React.FC<TripMarkerProps> = ({
  tripId,
  tripLegId,
  tripName,
  tripLegName,
  status,
  location,
  dateTime,
  Icon = LocationOnIcon
}) => {
  const dispatch = useDispatch();
  const activeMarker = useSelector(
    (state: AppState) => state.trip.activeTrip && state.trip.activeTrip.activeMarker
  );
  const [showHoverPopup, setShowHoverPopup] = useState(false);

  const isActive = activeMarker === tripLegId;
  const [lng, lat] = location;

  const handleHover = ({ type }: React.MouseEvent) => {
    setShowHoverPopup(type === 'mouseenter');
  };

  const handleClick = () => {
    dispatch(setActiveTrip(tripId));
    dispatch(setActiveMarker(tripLegId));
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
      {showHoverPopup && (
        <PopupStyled longitude={lng} latitude={lat} closeButton={false}>
          <div className='markerPopup-tripName'>{tripName}</div>
          <div className='markerPopup-legName'>{tripLegName}</div>
          <div>
            <span>Date:</span>
            {' '}
            <span>{new Date(dateTime).toLocaleDateString()}</span>
          </div>
          <div>
            <span>Status:</span>
            {' '}
            <span>{status}</span>
          </div>
        </PopupStyled>
      )}
    </>
  );
};

export default memo(TripMarker);
