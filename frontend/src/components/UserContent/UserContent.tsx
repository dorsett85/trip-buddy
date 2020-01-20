import React, { useState } from 'react';
import styled from 'styled-components';
import { DispatchProp } from 'react-redux';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { setUser } from '../../store/user/actions';
import { User } from '../../types/user';
import EditableTextField from '../generic/EditableTextField/EditableTextField';
import { getFirstError } from '../../utils/apolloErrors';
import {
  SUCCESSFUL_UPDATE_MESSAGE,
  UPDATING_MESSAGE
} from '../../utils/constants/messages';
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
  user: User;
}

export interface UserInfoProps extends DispatchProp<AppAction> {
  user: User;
}

const UserInfo = styled.div`
  padding-top: 1rem;
`;

const UserNameInput: React.FC<UserInfoProps> = ({ dispatch, user }) => {
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
      margin='normal'
    />
  );
};

const UserEmailInput: React.FC<UserInfoProps> = ({ dispatch, user }) => {
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
      margin='normal'
    />
  );
};

const UserContent: React.FC<UserContentProps> = ({ dispatch, user }) => {
  return (
    <UserInfo>
      <h2>Account Details</h2>
      <UserNameInput dispatch={dispatch} user={user} />
      <UserEmailInput dispatch={dispatch} user={user} />
    </UserInfo>
  );
};

export default UserContent;
