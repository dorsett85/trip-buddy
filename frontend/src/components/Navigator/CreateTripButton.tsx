import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { setCreatingTrip } from '../../store/trip/actions';

const CreateTripButton: React.FC<ButtonProps> = props => {
  const dispatch = useDispatch();
  const creatingTrip = useSelector((state: AppState) => state.trip.creatingTrip);

  const handleClick = () => {
    dispatch(setCreatingTrip(!creatingTrip));
  };

  return (
    <Button onClick={handleClick} {...props}>
      {`${creatingTrip ? 'Cancel' : 'Create'} Trip`}
    </Button>
  );
};

export default CreateTripButton;
