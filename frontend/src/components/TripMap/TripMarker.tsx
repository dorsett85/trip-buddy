import React, { useState, memo, ReactElement } from 'react';
import { Marker, Popup } from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import styled from 'styled-components';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTrip, setActiveMarker } from '../../store/trip/actions';
import { AppState } from '../../store';
import { setOpenDrawer } from '../../store/general/actions';
import { Trip } from '../../types/trip';
import { LngLatArray } from '../../types/shared';

export interface TripMarkerProps {
  /**
   * Used when clicking on a marker to set the activeTrip
   */
  tripId: Trip['id'];
  /**
   * Used for displaying if the marker is active
   */
  markerId: number;
  /**
   * Used for placing the marker on the map
   */
  location: LngLatArray;
  /**
   * Used for displaying hover content
   */
  hoverContent: ReactElement | string;
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
  .markerP
  .markerPopup-tripName,
  .markerPopup-itineraryName {
    text-align: center;
  }
  .markerPopup-tripName {
    font-size: 1.25rem;
    font-weight: bold;
  }
  .markerPopup-itineraryName {
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: gray;
  }
`;

const TripMarker: React.FC<TripMarkerProps> = ({
  tripId,
  markerId,
  location,
  hoverContent,
  Icon = LocationOnIcon
}) => {
  const dispatch = useDispatch();
  const activeMarker = useSelector(
    (state: AppState) => state.trip.activeTrip && state.trip.activeTrip.activeMarker
  );
  const [showHoverPopup, setShowHoverPopup] = useState(false);

  const isActive = activeMarker === markerId;
  const [lng, lat] = location;

  const handleHover = ({ type }: React.MouseEvent) => {
    setShowHoverPopup(type === 'mouseenter');
  };

  const handleClick = () => {
    dispatch(setActiveTrip(tripId));
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
      {showHoverPopup && (
        <PopupStyled longitude={lng} latitude={lat} closeButton={false}>
          {hoverContent}
        </PopupStyled>
      )}
    </>
  );
};

export default memo(TripMarker);
