import React, { memo } from 'react';
import { Popup } from 'react-map-gl';
import styled from 'styled-components';
import { TripItinerary, Trip } from '../../types/trip';
import { isTrip } from '../../utils/isTrip';

export interface TripItineraryWithPosition extends TripItinerary {
  /**
   * To display the itinerary position order in the popup
   */
  position: number;
}

export interface TripMarkerPopupProps {
  /**
   * Data for popup
   */
  popupData: Trip | TripItineraryWithPosition;
}

const BEM_MARKER_POPUP = 'markerPopup';

const PopupStyled = styled(Popup)`
  z-index: 1;
  .${BEM_MARKER_POPUP}-header {
    text-align: center;
    .${BEM_MARKER_POPUP}-tripName {
      font-size: 1.25rem;
      font-weight: bold;
    }
    .${BEM_MARKER_POPUP}-itineraryName {
      font-weight: bold;
      color: gray;
    }
  }
`;

const TripMarkerPopup: React.FC<TripMarkerPopupProps> = ({ popupData }) => {
  const [lng, lat] = popupData.location;
  const date = isTrip(popupData)
    ? new Date(popupData.start_date).toLocaleDateString()
    : new Date(popupData.start_time).toLocaleString();

  const content = (
    <>
      <div className={`${BEM_MARKER_POPUP}-header`}>
        {isTrip(popupData) ? (
          <div className={`${BEM_MARKER_POPUP}-tripName`}>{popupData.name}</div>
        ) : (
          <>
            <div>
              <span>Itinerary </span>
              <span>#</span>
              <span>{popupData.position}</span>
            </div>
            <div className={`${BEM_MARKER_POPUP}-itineraryName`}>{popupData.name}</div>
          </>
        )}
        <span>{date}</span>
      </div>
      {isTrip(popupData) && (
        <>
          <hr />
          <div>
            <span>Status: </span>
            <span>{popupData.status}</span>
          </div>
        </>
      )}
    </>
  );
  return (
    <PopupStyled longitude={lng} latitude={lat} closeButton={false}>
      {content}
    </PopupStyled>
  );
};

export default memo(TripMarkerPopup);
