import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import LinearProgress from '@material-ui/core/LinearProgress';
import { DispatchProp, useSelector } from 'react-redux';
import styled from 'styled-components';
import TripItineraryPanel from './TripItineraryPanel';
import { ActiveTripInfo } from '../../store/trip/types';
import { setTripItineraries, setTripItineraryCreator } from '../../store/trip/actions';
import { useTripItineraries } from '../../store/hooks/useTrip';
import { AppAction } from '../../store/types';
import TripItineraryCreate from './TripItineraryCreate';
import { AppState } from '../../store';
import { GET_ITINERARIES } from '../ApolloProvider/gql/trip';

const ItineraryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface TripItinerariesProps extends DispatchProp<AppAction> {
  tripId: ActiveTripInfo['id'];
}

const TripItineraries: React.FC<TripItinerariesProps> = ({ dispatch, tripId }) => {
  const itineraries = useTripItineraries();
  const itineraryCreator = useSelector(({ trip }: AppState) => trip.itineraryCreator);
  const { data, loading } = useQuery(GET_ITINERARIES, {
    variables: { input: { id: tripId } },
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    if (data) {
      dispatch(setTripItineraries(data.trip.itineraries));
    }
  }, [dispatch, data]);

  const handleAddToggle = () => {
    dispatch(setTripItineraryCreator({}));
  };

  const addButton = !itineraryCreator && (
    <Fab onClick={handleAddToggle} color='primary' variant='extended'>
      <span>Add &nbsp;</span>
      <AddIcon />
    </Fab>
  );

  const createItinerary = itineraryCreator && (
    <TripItineraryCreate
      itinerary={{ trip_id: tripId, ...itineraryCreator }}
      dispatch={dispatch}
    />
  );

  const tripItinerary = loading ? (
    <LinearProgress />
  ) : (
    Object.values(itineraries).map((itinerary, index) => (
      <TripItineraryPanel
        key={itinerary.id}
        dispatch={dispatch}
        itinerary={itinerary}
        index={index}
      />
    ))
  );

  return (
    <div>
      <ItineraryHeader>
        <h2>Itinerary</h2>
        {addButton}
      </ItineraryHeader>
      {createItinerary}
      {tripItinerary}
    </div>
  );
};

export default TripItineraries;
