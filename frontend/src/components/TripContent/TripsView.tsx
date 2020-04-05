import React, { memo, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import { Tab, Tabs } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { setTripCreator } from '../../store/trip/reducer';
import { setDrawer } from '../../store/general/reducer';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import TripList from '../TripList/TripList';
import TripInviteList from '../TripInviteList/TripInviteList';

const Header = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
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

const TripsView: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleCreateTripClick = () => {
    dispatch(setDrawer({ open: false, content: undefined }));
    dispatch(setTripCreator({ openModal: true }));
  };

  return (
    <div>
      <Header>
        <h2>View Trips</h2>
        <Fab color='primary' variant='extended' onClick={handleCreateTripClick}>
          Create New Trip
        </Fab>
      </Header>
      <TripsTabLayout
        listContent={<TripList dispatch={dispatch} />}
        invitesContent={<TripInviteList dispatch={dispatch} />}
      />
    </div>
  );
};

export default memo(TripsView);
