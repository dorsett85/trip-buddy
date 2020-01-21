import React from 'react';
import { DispatchProp } from 'react-redux';
import TripDetail from './TripDetail';
import { useActiveTrip } from '../../store/hooks/useTrip';

const TripContent: React.FC<DispatchProp> = ({ dispatch }) => {
  const activeTrip = useActiveTrip();

  if (!activeTrip) {
    return null;
  }
  return <TripDetail dispatch={dispatch} trip={activeTrip} />;
};

export default TripContent;