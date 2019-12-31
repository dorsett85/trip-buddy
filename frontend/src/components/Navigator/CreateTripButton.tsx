import React, { memo } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { setTripCreator, setActiveTrip } from '../../store/trip/actions';

const CreateTripButton: React.FC<ButtonProps> = props => {
  const dispatch = useDispatch();
  const tripCreator = useSelector(({ trip }: AppState) => trip.tripCreator);
  const activeTrip = useSelector(({ trip }: AppState) => trip.activeTrip);

  const handleClick = () => {
    const newTrip = !tripCreator ? { openModal: true } : undefined;
    if (activeTrip) {
      dispatch(setActiveTrip(undefined));
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
