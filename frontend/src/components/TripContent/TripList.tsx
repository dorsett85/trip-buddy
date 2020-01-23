import React, { memo } from 'react';
import { DispatchProp } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import styled, { css } from 'styled-components';
import { setTripCreator, deleteTrip, setActiveTripInfo } from '../../store/trip/reducer';
import { Trip } from '../../types/trip';
import { setDrawer } from '../../store/general/reducer';
import { TripState } from '../../store/trip/types';

export interface TripListProps extends DispatchProp {
  trips: TripState['trips'];
}

const Header = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing('md')};
  `
);

const TripListView: React.FC<TripListProps> = ({ dispatch, trips }) => {
  const tripArray = Object.values(trips);

  const handleCreateTripClick = () => {
    dispatch(setDrawer({ open: false, content: undefined }));
    dispatch(setTripCreator({ openModal: true }));
  };

  const handleActiveTripClick = (id: Trip['id']) => () => {
    dispatch(setActiveTripInfo({ id, activeMarker: `${id}` }));
  };

  const handleDeleteClick = (id: Trip['id']) => () => {
    dispatch(deleteTrip(id));
  };

  const tripList = (
    <List>
      {tripArray.map((trip: Trip) => (
        <ListItem
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
            <IconButton
              onClick={handleDeleteClick(trip.id)}
              color='secondary'
              aria-label='delete trip'
            >
              <DeleteIcon />
            </IconButton>
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
