import React, { memo, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import { Tab, Tabs } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import styled, { css } from 'styled-components';
import { TripRecord } from 'common/lib/types/trip';
import { setTripCreator, setActiveTripInfo } from '../../store/trip/reducer';
import { setDrawer, setFlyTo } from '../../store/general/reducer';
import { TripState } from '../../store/trip/types';
import FlyToButton from '../generic/FlyToButton/FlyToButton';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';

export interface TripListProps {
  trips: TripState['trips'];
}

const Header = styled.div(
  ({ theme }) => css`
    text-align: right;
    margin-bottom: ${theme.spacing()};
  `
);

interface TripsTabPanelProps {
  listContent: React.ReactNode;
  invitesContent: React.ReactNode;
}

const TRIPS = 'trips';
const LIST = 'list';
const INVITES = 'invites';

const TRIPS_TAB_LIST = `${TRIPS}-tab-${LIST}`;
const TRIPS_TAB_INVITES = `${TRIPS}-tab-${INVITES}`;
const TRIPS_TAB_PANEL_LIST = `${TRIPS}-tabpanel-${LIST}`;
const TRIPS_TAB_PANEL_INVITES = `${TRIPS}-tabpanel-${INVITES}`;

type TabsValue = typeof LIST | typeof INVITES;

const TabPanel = styled.div(
  ({ theme }) => css`
    padding-top: ${theme.spacing('lg')};
  `
);

const TripsTabLayout: React.FC<TripsTabPanelProps> = ({
  listContent,
  invitesContent
}) => {
  const [tab, setTab] = useState<TabsValue>(LIST);

  const handleOnChange = (e: React.ChangeEvent<{}>, value: TabsValue) => {
    setTab(value);
  };

  return (
    <div>
      <Tabs
        value={tab}
        onChange={handleOnChange}
        variant='fullWidth'
        indicatorColor='primary'
        aria-label='trips-tabs'
      >
        <Tab
          id={TRIPS_TAB_LIST}
          label='Trip List'
          value={LIST}
          aria-controls={TRIPS_TAB_PANEL_LIST}
        />
        <Tab
          id={TRIPS_TAB_INVITES}
          label='Invites'
          value={INVITES}
          aria-controls={TRIPS_TAB_PANEL_INVITES}
        />
      </Tabs>
      <TabPanel
        id={TRIPS_TAB_PANEL_LIST}
        role='tabpanel'
        aria-labelledby={TRIPS_TAB_LIST}
        hidden={tab !== LIST}
      >
        {listContent}
      </TabPanel>
      <TabPanel
        id={TRIPS_TAB_PANEL_INVITES}
        role='tabpanel'
        aria-labelledby={TRIPS_TAB_INVITES}
        hidden={tab !== INVITES}
      >
        {invitesContent}
      </TabPanel>
    </div>
  );
};

const TripsView: React.FC<TripListProps> = ({ trips }) => {
  const dispatch = useAppDispatch();
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
    <>
      <div>
        You have&nbsp;
        {tripArray.length}
        &nbsp;trip
        {tripArray.length !== 1 ? 's' : ''}
      </div>
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
    </>
  );

  return (
    <div>
      <Header>
        <Fab color='primary' variant='extended' onClick={handleCreateTripClick}>
          Create New Trip
        </Fab>
      </Header>
      <TripsTabLayout listContent={tripList} invitesContent={<>Invites</>} />
    </div>
  );
};

export default memo(TripsView);
