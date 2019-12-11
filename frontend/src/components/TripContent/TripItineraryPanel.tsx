import React, { memo } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import { TripItinerary } from '../../types/trip';

interface TripItineraryPanelProps {
  itinerary: TripItinerary;
}

const ExpansionPanelStyled = styled(ExpansionPanel)`
  & .itineraryPanel-summary,
  & .itineraryPanel-content {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const TripItineraryPanel: React.FC<TripItineraryPanelProps> = ({ itinerary }) => {
  const itineraryInfo = (
    <div>
      {Object.keys(itinerary).map(key => (
        <div key={key}>
          <span>
            <b>{key}</b>: {itinerary[key as keyof TripItinerary]}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <ExpansionPanelStyled>
      <ExpansionPanelSummary
        className='itineraryPanel-summary'
        expandIcon={<ExpandMoreIcon />}
      >
        {itinerary.name}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className='itineraryPanel-content'>
        {itineraryInfo}
      </ExpansionPanelDetails>
    </ExpansionPanelStyled>
  );
};

export default memo(TripItineraryPanel);
