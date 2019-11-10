import React, { memo } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { setCreateTrip } from '../../store/trip/actions';

const CreateTripButton: React.FC<ButtonProps> = props => {
  const dispatch = useDispatch();
  const createTrip = useSelector(({ trip }: AppState) => trip.createTrip);

  const handleClick = () => {
    const newTrip = !createTrip ? { openModal: true } : undefined;
    dispatch(setCreateTrip(newTrip));
  };

  return (
    <Button onClick={handleClick} {...props}>
      {`${createTrip ? 'Cancel' : 'Create'} Trip`}
    </Button>
  );
};

export default memo(CreateTripButton);
