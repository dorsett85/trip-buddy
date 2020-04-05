import React from 'react';
import TripDetail from './TripDetail';
import { useActiveTrip } from '../../store/hooks/useTrip';
import TripsView from './TripsView';

const TripContent: React.FC = () => {
  const activeTrip = useActiveTrip();

  return activeTrip ? <TripDetail trip={activeTrip} /> : <TripsView />;
};

export default TripContent;
