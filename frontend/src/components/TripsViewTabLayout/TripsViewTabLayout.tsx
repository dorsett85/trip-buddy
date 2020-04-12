import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Tab, Tabs } from '@material-ui/core';
import TripList from '../TripList/TripList';
import TripInviteList from '../TripInviteList/TripInviteList';

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

const TripTabLayout: React.FC = () => {
  const [tab, setTab] = useState<TabsValue>(LIST);

  const handleOnChange = (e: React.ChangeEvent<{}>, value: TabsValue) => {
    setTab(value);
  };

  const viewingTripListTab = tab === LIST;
  const viewingInvitesTab = !viewingTripListTab;

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
        hidden={viewingInvitesTab}
      >
        <TripList />
      </TabPanel>
      <TabPanel
        id={TRIPS_TAB_PANEL_INVITES}
        role='tabpanel'
        aria-labelledby={TRIPS_TAB_INVITES}
        hidden={viewingTripListTab}
      >
        <TripInviteList viewing={viewingInvitesTab} />
      </TabPanel>
    </div>
  );
};

export default TripTabLayout;
