import React, { useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import LinearProgress from '@material-ui/core/LinearProgress';
import { DispatchProp } from 'react-redux';
import styled from 'styled-components';
import TripItineraryPanel from './TripItineraryPanel';
import { ActiveTripInfo } from '../../store/trip/types';
import { setTripItineraries, setTripItineraryCreator } from '../../store/trip/reducer';
import { useTripItineraries } from '../../store/hooks/useTrip';
import TripItineraryCreate from './TripItineraryCreate';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import { useGetTripItinerariesQuery } from '../ApolloProvider/hooks/tripItinerary';

const ItineraryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface TripItinerariesProps extends DispatchProp {
  tripId: ActiveTripInfo['id'];
}

const TripItineraries: React.FC<TripItinerariesProps> = ({ dispatch, tripId }) => {
  const itineraries = useTripItineraries();
  const itineraryCreator = useAppSelector(({ trip }) => trip.itineraryCreator);
  const { data, loading } = useGetTripItinerariesQuery({
    variables: { input: { trip_id: tripId } },
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    if (data) {
      dispatch(setTripItineraries(data.tripItineraries));
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
