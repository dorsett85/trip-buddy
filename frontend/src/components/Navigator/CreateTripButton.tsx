import React, { memo } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import {
  setTripCreator,
  setActiveTripInfo,
  setTripItineraries
} from '../../store/trip/actions';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { useAppSelector } from '../../store/hooks/useAppSelector';

const CreateTripButton: React.FC<ButtonProps> = props => {
  const dispatch = useAppDispatch();
  const tripCreator = useAppSelector(({ trip }) => trip.creator);
  const activeTrip = useAppSelector(({ trip }) => trip.activeTripInfo);

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
