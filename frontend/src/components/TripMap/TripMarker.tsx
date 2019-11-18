import React, { useState, memo } from 'react';
import { Marker, Popup } from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import styled from 'styled-components';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTrip } from '../../store/trip/actions';
import { AppState } from '../../store';
import { TripState } from '../../store/trip/types';

export interface TripMarkerProps {
  id: keyof TripState['trips'];
  Icon?: React.ComponentType<SvgIconProps>;
}

export interface IconWrapperProps {
  isActive: boolean;
}

const IconWrapper = styled.div<IconWrapperProps>`
  cursor: pointer;
  transform: scale(${props => (props.isActive ? 1.5 : 1)});
`;

const PopupStyled = styled(Popup)`
  z-index: 1;
`;

const TripMarker: React.FC<TripMarkerProps> = ({ id, Icon = LocationOnIcon }) => {
  const dispatch = useDispatch();
  const trip = useSelector((state: AppState) => state.trip.trips[id]);
  const isActive = useSelector((state: AppState) =>
    state.trip.activeTrip ? state.trip.activeTrip.id === trip.id : false
  );
  const [showHoverPopup, setShowHoverPopup] = useState(false);

  const {
    start_location: [lng, lat]
  } = trip;

  const handleHover = ({ type }: React.MouseEvent) => {
    setShowHoverPopup(type === 'mouseenter');
  };

  const handleClick = () => {
    dispatch(setActiveTrip(trip));
  };

  return (
    <>
      <Marker longitude={lng} latitude={lat} offsetLeft={-12} offsetTop={-12}>
        <IconWrapper isActive={isActive}>
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
          {trip.name}
        </PopupStyled>
      )}
    </>
  );
};

export default memo(TripMarker);
