import React, { memo } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { setTripCreator } from '../../store/trip/actions';

const CreateTripButton: React.FC<ButtonProps> = props => {
  const dispatch = useDispatch();
  const tripCreator = useSelector(({ trip }: AppState) => trip.tripCreator);

  const handleClick = () => {
    const newTrip = !tripCreator ? { openModal: true } : undefined;
    dispatch(setTripCreator(newTrip));
  };

  return (
    <Button onClick={handleClick} {...props}>
      {`${tripCreator ? 'Cancel' : 'Create'} Trip`}
    </Button>
  );
};

export default memo(CreateTripButton);
