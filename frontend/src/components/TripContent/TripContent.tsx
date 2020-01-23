import React from 'react';
import { DispatchProp } from 'react-redux';
import TripDetail from './TripDetail';
import { useActiveTrip, useTrips } from '../../store/hooks/useTrip';
import TripList from './TripListView';

const TripContent: React.FC<DispatchProp> = ({ dispatch }) => {
  const trips = useTrips();
  const activeTrip = useActiveTrip();

  return activeTrip ? (
    <TripDetail dispatch={dispatch} trip={activeTrip} />
  ) : (
    <TripList dispatch={dispatch} trips={trips} />
  );
};

export default TripContent;
