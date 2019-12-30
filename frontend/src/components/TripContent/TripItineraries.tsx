import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import LinearProgress from '@material-ui/core/LinearProgress';
import { DispatchProp, useSelector } from 'react-redux';
import TripItineraryPanel from './TripItineraryPanel';
import { ActiveTrip } from '../../store/trip/types';
import { AppState } from '../../store';
import { setActiveTripItineraries } from '../../store/trip/actions';

export const GET_ITINERARY = gql`
  query GetItinerary($input: FindTripInput) {
    trip(input: $input) {
      itineraries {
        id
        trip_id
        name
        description
        location
        start_time
        end_time
      }
    }
  }
`;

interface TripItinerariesProps extends DispatchProp {
  tripId: ActiveTrip['id'];
}

const TripItineraries: React.FC<TripItinerariesProps> = ({ dispatch, tripId }) => {
  const itineraries = useSelector(
    (state: AppState) => state.trip.activeTrip!.itineraries
  );
  const { data, loading } = useQuery(GET_ITINERARY, {
    variables: { input: { id: tripId } }
  });

  useEffect(() => {
    if (data) {
      dispatch(setActiveTripItineraries(data.trip.itineraries));
    }
  }, [dispatch, data]);

  const tripItinerary = loading ? (
    <LinearProgress />
  ) : (
    itineraries &&
    itineraries.map(itinerary => (
      <TripItineraryPanel key={itinerary.id} itinerary={itinerary} />
    ))
  );
  return (
    <div>
      <h3>Itinerary</h3>
      {tripItinerary}
    </div>
  );
};

export default TripItineraries;
