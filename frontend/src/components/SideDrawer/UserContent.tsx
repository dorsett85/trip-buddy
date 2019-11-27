import React from 'react';
import { Dispatch } from 'redux';
import Tab from '@material-ui/core/Tab';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import TabBar from '../generic/TabBar/TabBar';
import { UserState } from '../../store/user/types';
import { setViewProfile, setViewAccount } from '../../store/user/actions';
import { AppState } from '../../store';

export interface UserContentProps {
  dispatch: Dispatch;
  user: UserState;
}

const UserInfo = styled.div`
  padding-top: 1rem;
`;

const UserContent: React.FC<UserContentProps> = ({ dispatch, user }) => {
  const viewProfile = useSelector((state: AppState) => state.user.viewProfile);

  const tabValue = viewProfile ? 'profile' : 'account';

  const handleTabClick = (e: React.ChangeEvent<{}>, value: any) => {
    if (value === 'profile') {
      dispatch(setViewProfile(true));
      dispatch(setViewAccount(false));
    } else {
      dispatch(setViewAccount(true));
      dispatch(setViewProfile(false));
    }
  };

  // Define what's in the profile and acocunt tab
  const content = viewProfile ? (
    <ul>
      <li>User Id: {user.id}</li>
      <li>Username: {user.username}</li>
    </ul>
  ) : (
    <div>Account information</div>
  );

  return (
    <>
      <TabBar
        tabsProps={{
          value: tabValue,
          onChange: handleTabClick
        }}
      >
        <Tab label='Profile' value='profile' />
        <Tab label='Account' value='account' />
      </TabBar>
      <UserInfo>{content}</UserInfo>
    </>
  );
};

export default UserContent;
