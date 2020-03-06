import React, { memo } from 'react';
import { DispatchProp } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import styled, { css } from 'styled-components';
import { TripRecord } from 'common/lib/types/trip';
import { setTripCreator, setActiveTripInfo } from '../../store/trip/reducer';
import { setDrawer, setFlyTo } from '../../store/general/reducer';
import { TripState } from '../../store/trip/types';
import FlyToButton from '../generic/FlyToButton';

export interface TripListProps extends DispatchProp {
  trips: TripState['trips'];
}

const Header = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing()};
  `
);

const TripListView: React.FC<TripListProps> = ({ dispatch, trips }) => {
  const tripArray = Object.values(trips);

  const handleCreateTripClick = () => {
    dispatch(setDrawer({ open: false, content: undefined }));
    dispatch(setTripCreator({ openModal: true }));
  };

  const handleActiveTripClick = (id: TripRecord['id']) => () => {
    dispatch(setActiveTripInfo({ id, activeMarker: `${id}` }));
  };

  const handleFlyToClick = (id: TripRecord['id']) => () => {
    dispatch(setDrawer({ open: false }));
    dispatch(setFlyTo(trips[id].location));
    dispatch(setActiveTripInfo({ id, activeMarker: `${id}` }));
  };

  const tripList = (
    <List>
      {tripArray.map((trip: TripRecord) => (
        <ListItem
          key={trip.id}
          button
          onClick={handleActiveTripClick(trip.id)}
          aria-label='select trip'
        >
          <ListItemText
            primary={trip.name}
            secondary={`${new Date(
              trip.start_date
            ).toLocaleDateString()} - ${trip.status.toLocaleUpperCase()}`}
          />
          <ListItemSecondaryAction>
            <FlyToButton onClick={handleFlyToClick(trip.id)} />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );

  return (
    <div>
      <Header>
        <h2>Trip List</h2>
        <Fab color='primary' variant='extended' onClick={handleCreateTripClick}>
          Create New Trip
        </Fab>
      </Header>
      <div>
        You have&nbsp;
        {tripArray.length}
        &nbsp;trip
        {tripArray.length !== 1 ? 's' : ''}
      </div>
      {tripList}
    </div>
  );
};

export default memo(TripListView);
