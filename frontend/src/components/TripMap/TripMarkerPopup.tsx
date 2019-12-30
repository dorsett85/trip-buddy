import React, { memo } from 'react';
import { Popup } from 'react-map-gl';
import styled from 'styled-components';
import { TripItinerary, Trip } from '../../types/trip';

interface TripMarkerPopupProps {
  /**
   * Data for popup
   */
  popupData: Trip | TripItinerary;
}

const PopupStyled = styled(Popup)`
  z-index: 1;
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

const TripMarkerPopup: React.FC<TripMarkerPopupProps> = ({ popupData }) => {
  const [lng, lat] = popupData.location;
  // const hoverContent = (
  //   <>
  //     <div className='markerPopup-tripName'>{popupData.name}</div>
  //     <div>
  //       <span>Date:</span>
  //       {' '}
  //       <span>{new Date(popupData.start_date).toLocaleDateString()}</span>
  //     </div>
  //     <div>
  //       <span>Status:</span>
  //       {' '}
  //       <span>{popupData.status}</span>
  //     </div>
  //   </>
  // );
  return (
    <PopupStyled longitude={lng} latitude={lat} closeButton={false}>
      <span>This is a trip popup</span>
    </PopupStyled>
  );
};

export default memo(TripMarkerPopup);
