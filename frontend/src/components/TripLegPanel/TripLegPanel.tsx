import React, { memo, useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import { TripLeg, TripLegItinerary } from '../../types/trip';

export const GET_ITINERARY = gql`
  query GetItinerary($input: TripLegItineraryInput) {
    itinerary(input: $input) {
      id
      trip_leg_id
      description
      start_time
      end_time
      created_date
    }
  }
`;

interface TripLegPanelProps {
  leg: TripLeg;
}

const ExpansionPanelStyled = styled(ExpansionPanel)`
  & .itineraryPanel-summary,
  & .itineraryPanel-content {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const TripLegPanel: React.FC<TripLegPanelProps> = ({ leg }) => {
  const [itinerary, setItinerary] = useState<TripLegItinerary[]>();
  const [getItinerary, { loading }] = useLazyQuery(GET_ITINERARY, {
    onCompleted: (data: { itinerary: TripLegItinerary[] }) => {
      setItinerary(data.itinerary);
    }
  });

  const handleOnChange = (e: any, expanded: boolean) => {
    if (!itinerary && expanded) {
      getItinerary({ variables: { trip_leg_id: leg.id } });
    }
  };

  const content = loading ? <LinearProgress /> : <div>{itinerary}</div>;

  return (
    <ExpansionPanelStyled onChange={handleOnChange}>
      <ExpansionPanelSummary
        className='itineraryPanel-summary'
        expandIcon={<ExpandMoreIcon />}
      >
        {leg.name}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className='itineraryPanel-content'>
        <div>
          {Object.keys(leg).map(key => (
            <div key={key}>
              <span>
                <b>{key}</b>: {leg[key as keyof TripLeg]}
              </span>
            </div>
          ))}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanelStyled>
  );
};

export default memo(TripLegPanel);
