import React, { memo } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import {
  setTripCreator,
  setActiveTripInfo,
  setTripItineraries
} from '../../store/trip/actions';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';

const CreateTripButton: React.FC<ButtonProps> = props => {
  const dispatch = useAppDispatch();
  const tripCreator = useSelector(({ trip }: AppState) => trip.creator);
  const activeTrip = useSelector(({ trip }: AppState) => trip.activeTripInfo);

  const handleClick = () => {
    const newTrip = !tripCreator ? { openModal: true } : undefined;
    if (activeTrip) {
      dispatch(setActiveTripInfo());
      dispatch(setTripItineraries());
    }
    dispatch(setTripCreator(newTrip));
  };

  return (
    <Button onClick={handleClick} {...props}>
      {`${tripCreator ? 'Cancel' : 'Create'} Trip`}
    </Button>
  );
};

export default memo(CreateTripButton);
