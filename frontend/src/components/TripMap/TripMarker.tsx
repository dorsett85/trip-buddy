import React, { useState, memo } from 'react';
import { Marker, Popup } from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import styled from 'styled-components';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTrip } from '../../store/trip/actions';
import { AppState } from '../../store';
import { TripState } from '../../store/trip/types';
import { setOpenDrawer } from '../../store/general/actions';
import { Trip, TripLeg } from '../../types/trip';

export interface TripMarkerProps {
  tripId: keyof TripState['trips'];
  tripLegId: number;
  tripName: Trip['name'];
  location: TripLeg['location']; 
  Icon?: React.ComponentType<SvgIconProps>;
}

const IconWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.25s;
  &.active {
    transform: scale(1.5)
  }
`;

const PopupStyled = styled(Popup)`
  z-index: 1;
`;

const TripMarker: React.FC<TripMarkerProps> = ({
  tripId,
  tripLegId,
  tripName,
  location,
  Icon = LocationOnIcon
}) => {
  const dispatch = useDispatch();
  const isActive = useSelector((state: AppState) =>
    state.trip.activeTrip ? state.trip.activeTrip.id === tripId : false
  );
  const [showHoverPopup, setShowHoverPopup] = useState(false);

  const [lng, lat] = location;

  const handleHover = ({ type }: React.MouseEvent) => {
    setShowHoverPopup(type === 'mouseenter');
  };

  const handleClick = () => {
    dispatch(setActiveTrip(tripId));
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
          {tripName}
        </PopupStyled>
      )}
    </>
  );
};

export default memo(TripMarker);
