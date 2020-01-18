import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import LinearProgress from '@material-ui/core/LinearProgress';
import { DispatchProp } from 'react-redux';
import styled from 'styled-components';
import TripItineraryPanel from './TripItineraryPanel';
import { ActiveTripInfo } from '../../store/trip/types';
import { setActiveTripInfoItineraries } from '../../store/trip/actions';
import { useActiveTripItineraries } from '../../utils/hooks/useActiveTripItineraries';
import { AppAction } from '../../store/types';

export const GET_ITINERARY = gql`
  query GetItinerary($input: FindTripInput) {
    trip(input: $input) {
      itineraries {
        id
        trip_id
        name
        description
        location
        location_address
        start_time
        end_time
      }
    }
  }
`;

const ItineraryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface TripItinerariesProps extends DispatchProp<AppAction> {
  tripId: ActiveTripInfo['id'];
}

const TripItineraries: React.FC<TripItinerariesProps> = ({ dispatch, tripId }) => {
  const itineraries = useActiveTripItineraries();
  const { data, loading } = useQuery(GET_ITINERARY, {
    variables: { input: { id: tripId } }
  });

  useEffect(() => {
    if (data) {
      dispatch(setActiveTripInfoItineraries(data.trip.itineraries));
    }
  }, [dispatch, data]);

  const tripItinerary = loading ? (
    <LinearProgress />
  ) : (
    itineraries &&
    itineraries.map((itinerary, idx) => (
      <TripItineraryPanel
        key={itinerary.id}
        dispatch={dispatch}
        itinerary={itinerary}
        index={idx}
      />
    ))
  );
  return (
    <div>
      <ItineraryHeader>
        <h2>Itinerary</h2>
        <Fab color='primary' variant='extended'>
          <span>Add &nbsp;</span>
          <AddIcon />
        </Fab>
      </ItineraryHeader>
      {tripItinerary}
    </div>
  );
};

export default TripItineraries;
