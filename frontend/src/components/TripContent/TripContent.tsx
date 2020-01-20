import React from 'react';
import { DispatchProp } from 'react-redux';
import { AppAction } from '../../store/types';
import TripDetail from './TripDetail';
import { useActiveTrip } from '../../utils/hooks/useTrip';

const TripContent: React.FC<DispatchProp<AppAction>> = ({ dispatch }) => {
  const activeTrip = useActiveTrip();

  if (!activeTrip) {
    return null;
  }
  return <TripDetail dispatch={dispatch} trip={activeTrip} />;
};

export default TripContent;