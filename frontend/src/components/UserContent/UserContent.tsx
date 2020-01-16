import React, { useState } from 'react';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';
import { DispatchProp } from 'react-redux';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import TabBar from '../generic/TabBar/TabBar';
import { UserState } from '../../store/user/types';
import { setViewInfo, setUser } from '../../store/user/actions';
import { User } from '../../types/user';
import EditableTextField from '../generic/EditableTextField/EditableTextField';
import { getFirstError } from '../../utils/apolloErrors';
import { SUCCESSFUL_UPDATE_MESSAGE, UPDATING_MESSAGE } from '../../utils/constants/messages';
import { AppAction } from '../../store/types';

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput) {
    updateUser(input: $input) {
      username
      email
    }
  }
`;

export interface UserContentProps extends DispatchProp<AppAction> {
  user?: UserState;
}

export interface UserInfoProps extends DispatchProp<AppAction> {
  user: User;
}

const UserInfo = styled.div`
  padding-top: 1rem;
`;

const UserProfile: React.FC<UserInfoProps> = ({ dispatch, user }) => {
  const [username, setUsername] = useState(user.username);
  const [editingUsername, setEditingUsername] = useState(false);
  const [updateUsernameText, setUpdateUsernameText] = useState('');
  const [updateUsernameError, setUpdateUsernameError] = useState(false);

  // Define update user mutation and handlers
  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      setEditingUsername(false);
      setUpdateUsernameError(false);
      dispatch(setUser({ username }));
      setUpdateUsernameText(SUCCESSFUL_UPDATE_MESSAGE);
    },
    onError: error => {
      setUpdateUsernameError(true);
      setUpdateUsernameText(getFirstError(error));
    }
  });

  const handleUsernameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEditingUsername(true);
    if (target.value.length >= 4) {
      setUsername(target.value);
    }
  };

  const handleSubmitUsername = () => {
    setUpdateUsernameError(false);
    setUpdateUsernameText('');
    updateUser({ variables: { input: { username } } });
  };

  const handleCancelUsername = () => {
    if (username !== user.username) {
      setUsername(user.username);
    }
    setEditingUsername(false);
    setUpdateUsernameError(false);
    setUpdateUsernameText('');
  };

  return (
    <>
      <h2>Edit profile info:</h2>
      <EditableTextField
        label='Username'
        value={username}
        editing={editingUsername}
        onChange={handleUsernameChange}
        onSubmitEdit={handleSubmitUsername}
        onCancelEdit={handleCancelUsername}
        helperText={loading ? UPDATING_MESSAGE : updateUsernameText}
        error={updateUsernameError}
        fullWidth
      />
    </>
  );
};

const UserAccount: React.FC<UserInfoProps> = ({ dispatch, user }) => {
  const [email, setEmail] = useState(user.email);
  const [editingEmail, setEditingEmail] = useState(false);
  const [updateEmailText, setUpdateEmailText] = useState('');
  const [updateEmailError, setUpdateEmailError] = useState(false);

  // Define update user mutation and handlers
  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      setEditingEmail(false);
      setUpdateEmailError(false);
      dispatch(setUser({ email }));
      setUpdateEmailText(SUCCESSFUL_UPDATE_MESSAGE);
    },
    onError: error => {
      setUpdateEmailError(true);
      setUpdateEmailText(getFirstError(error));
    }
  });

  const handleEmailChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEditingEmail(true);
    if (target.value.length >= 4) {
      setEmail(target.value);
    }
  };

  const handleSubmitEmail = () => {
    setUpdateEmailError(false);
    setUpdateEmailText('');
    updateUser({ variables: { input: { email } } });
  };

  const handleCancelEmail = () => {
    if (email !== user.email) {
      setEmail(user.email);
    }
    setEditingEmail(false);
    setUpdateEmailError(false);
    setUpdateEmailText('');
  };

  return (
    <>
      <h2>Edit Account info:</h2>
      <EditableTextField
        label='Email'
        value={email}
        editing={editingEmail}
        onChange={handleEmailChange}
        onSubmitEdit={handleSubmitEmail}
        onCancelEdit={handleCancelEmail}
        helperText={loading ? UPDATING_MESSAGE : updateEmailText}
        error={updateEmailError}
        fullWidth
      />
    </>
  );
};

const UserContent: React.FC<UserContentProps> = ({ dispatch, user }) => {
  const handleTabClick = (e: React.ChangeEvent<{}>, value: any) => {
    dispatch(setViewInfo(value));
  };

  // Check to display profile or account tab
  const content =
    user &&
    (user.viewInfo === 'profile' ? (
      <UserProfile dispatch={dispatch} user={user as User} />
    ) : (
      <UserAccount dispatch={dispatch} user={user as User} />
    ));

  return (
    <>
      <TabBar
        tabsProps={{
          value: user && user.viewInfo,
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
