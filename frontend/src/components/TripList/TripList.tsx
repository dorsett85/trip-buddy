import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { setActiveTripInfo } from '../../store/trip/reducer';
import { setDrawer, setFlyTo } from '../../store/general/reducer';
import FlyToButton from '../generic/FlyToButton/FlyToButton';
import { useTrips } from '../../store/hooks/useTrip';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { Trip } from "../../api/apollo/graphql";

const TripList: React.FC = () => {
  const dispatch = useAppDispatch();
  const trips = useTrips();
  const tripArray = Object.values(trips);

  const handleActiveTripClick = (id: Trip['id']) => () => {
    dispatch(setActiveTripInfo({ id, activeMarker: `${id}` }));
  };

  const handleFlyToClick: React.MouseEventHandler<HTMLButtonElement> = ({
    currentTarget
  }) => {
    const id = +currentTarget.value;
    dispatch(setDrawer({ open: false }));
    dispatch(setFlyTo(trips[id].location));
    dispatch(setActiveTripInfo({ id, activeMarker: `${id}` }));
  };

  return (
    <>
      <div>
        You have&nbsp;
        {tripArray.length}
        &nbsp;trip
        {tripArray.length !== 1 ? 's' : ''}
      </div>
      <List>
        {tripArray.map(trip => (
          <ListItem
            key={trip.id}
            button
            onClick={handleActiveTripClick(trip.id)}
            aria-label='select trip'
          >
            <ListItemText
              primary={trip.name}
              secondary={`${new Date(trip.start_date).toLocaleString(navigator.language, {
                weekday: 'short',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })} - ${trip.status.toLocaleUpperCase()}`}
            />
            <ListItemSecondaryAction>
              <FlyToButton onClick={handleFlyToClick} value={trip.id} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TripList;
