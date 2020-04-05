import React from 'react';
import TripDetail from './TripDetail';
import { useActiveTrip, useTrips } from '../../store/hooks/useTrip';
import TripsView from './TripsView';

const TripContent: React.FC = () => {
  const trips = useTrips();
  const activeTrip = useActiveTrip();

  return activeTrip ? <TripDetail trip={activeTrip} /> : <TripsView trips={trips} />;
};

export default TripContent;
