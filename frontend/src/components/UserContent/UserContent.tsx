import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { DispatchProp } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { UserRecord } from 'common/lib/types/user';
import { setUser } from '../../store/user/reducer';
import EditableTextField from '../generic/EditableTextField/EditableTextField';
import { getFirstError } from '../../utils/apolloErrors';
import { UPDATING_MESSAGE } from '../../utils/constants/messages';
import SuccessText from '../AppText/SuccessText';
import ErrorText from '../AppText/ErrorText';
import { UPDATE_USER } from '../ApolloProvider/gql/user';

export interface UserContentProps extends DispatchProp {
  user: UserRecord;
}

const UserInfo = styled.div(
  ({ theme }) => css`
    padding-top: ${theme.spacing()};
  `
);

const UserNameInput: React.FC<UserContentProps> = ({ dispatch, user }) => {
  const [username, setUsername] = useState(user.username);
  const [editingUsername, setEditingUsername] = useState(false);
  const [updateUsernameText, setUpdateUsernameText] = useState<JSX.Element>();
  const [updateUsernameError, setUpdateUsernameError] = useState<JSX.Element>();

  // Define update user mutation and handlers
  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      setEditingUsername(false);
      dispatch(setUser({ username }));
      setUpdateUsernameError(undefined);
      setUpdateUsernameText(<SuccessText />);
    },
    onError: error => {
      setUpdateUsernameText(<ErrorText text={getFirstError(error)} />);
    }
  });

  const handleUsernameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEditingUsername(true);
    if (target.value.length >= 4) {
      setUsername(target.value);
    }
  };

  const handleSubmitUsername = () => {
    setUpdateUsernameError(undefined);
    setUpdateUsernameText(undefined);
    updateUser({ variables: { input: { username } } });
  };

  const handleCancelUsername = () => {
    if (username !== user.username) {
      setUsername(user.username);
    }
    setEditingUsername(false);
    setUpdateUsernameError(undefined);
    setUpdateUsernameText(undefined);
  };

  const helperText =
    updateUsernameError || updateUsernameText || (loading && UPDATING_MESSAGE) || '';

  return (
    <EditableTextField
      label='Username'
      value={username}
      editing={editingUsername}
      onChange={handleUsernameChange}
      onSubmitEdit={handleSubmitUsername}
      onCancelEdit={handleCancelUsername}
      helperText={helperText}
      error={!!updateUsernameError}
      fullWidth
      margin='normal'
    />
  );
};

const UserEmailInput: React.FC<UserContentProps> = ({ dispatch, user }) => {
  const [email, setEmail] = useState(user.email);
  const [editingEmail, setEditingEmail] = useState(false);
  const [updateEmailText, setUpdateEmailText] = useState<JSX.Element>();
  const [updateEmailError, setUpdateEmailError] = useState<JSX.Element>();

  // Define update user mutation and handlers
  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      setEditingEmail(false);
      dispatch(setUser({ email }));
      setUpdateEmailError(undefined);
      setUpdateEmailText(<SuccessText />);
    },
    onError: error => {
      setUpdateEmailText(<ErrorText text={getFirstError(error)} />);
    }
  });

  const handleEmailChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEditingEmail(true);
    if (target.value.length >= 4) {
      setEmail(target.value);
    }
  };

  const handleSubmitEmail = () => {
    setUpdateEmailError(undefined);
    setUpdateEmailText(undefined);
    updateUser({ variables: { input: { email } } });
  };

  const handleCancelEmail = () => {
    if (email !== user.email) {
      setEmail(user.email);
    }
    setEditingEmail(false);
    setUpdateEmailError(undefined);
    setUpdateEmailText(undefined);
  };

  const helperText =
    updateEmailError || updateEmailText || (loading && UPDATING_MESSAGE) || '';

  return (
    <EditableTextField
      label='Email'
      value={email}
      editing={editingEmail}
      onChange={handleEmailChange}
      onSubmitEdit={handleSubmitEmail}
      onCancelEdit={handleCancelEmail}
      helperText={helperText}
      error={!!updateEmailError}
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
