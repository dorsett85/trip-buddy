import React, { memo } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { setTripCreator, setActiveTrip } from '../../store/trip/actions';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';

const CreateTripButton: React.FC<ButtonProps> = props => {
  const dispatch = useAppDispatch();
  const tripCreator = useSelector(({ trip }: AppState) => trip.tripCreator);
  const activeTrip = useSelector(({ trip }: AppState) => trip.activeTrip);

  const handleClick = () => {
    const newTrip = !tripCreator ? { openModal: true } : undefined;
    if (activeTrip) {
      dispatch(setActiveTrip());
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
