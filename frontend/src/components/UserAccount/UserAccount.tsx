import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { DispatchProp } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { setUser } from '../../store/user/reducer';
import EditableTextField from '../generic/EditableTextField/EditableTextField';
import { getFirstError } from '../../utils/apolloErrors';
import { UPDATING_MESSAGE } from '../../utils/constants/messages';
import SuccessText from '../AppText/SuccessText';
import ErrorText from '../AppText/ErrorText';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import {
  AcceptingTripInvites,
  User,
  useUpdateUserMutation
} from '../../api/apollo/graphql';
import { isValidEmail } from '../../utils/isValidEmail';

interface UserAccountProps {
  user: User;
}

type UserAccountInputProps = UserAccountProps & DispatchProp;

const UserInfo = styled.div(
  ({ theme }) => css`
    padding-top: ${theme.spacing()};
  `
);

const UserNameInput: React.FC<UserAccountInputProps> = ({ dispatch, user }) => {
  const [username, setUsername] = useState(user.username);
  const [editingUsername, setEditingUsername] = useState(false);
  const [updateUsernameText, setUpdateUsernameText] = useState<JSX.Element>();
  const [updateUsernameError, setUpdateUsernameError] = useState<JSX.Element>();

  // Define update user mutation and handlers
  const [updateUser, { loading }] = useUpdateUserMutation({
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

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target
  }) => {
    setEditingUsername(true);
    setUsername(target.value);
  };

  const handleSubmitUsername = () => {
    if (username.length < 5) {
      setUpdateUsernameError(<ErrorText text='Must be at least 4 characters' />);
    } else {
      setUpdateUsernameError(undefined);
      setUpdateUsernameText(undefined);
      updateUser({ variables: { input: { username } } });
    }
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

const UserEmailInput: React.FC<UserAccountInputProps> = ({ dispatch, user }) => {
  const [email, setEmail] = useState(user.email);
  const [editingEmail, setEditingEmail] = useState(false);
  const [updateEmailText, setUpdateEmailText] = useState<JSX.Element>();
  const [updateEmailError, setUpdateEmailError] = useState<JSX.Element>();

  // Define update user mutation and handlers
  const [updateUser, { loading }] = useUpdateUserMutation({
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

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setEditingEmail(true);
    setEmail(target.value);
  };

  const handleSubmitEmail = () => {
    // Check if the new email is valid
    if (!isValidEmail(email)) {
      setUpdateEmailError(<ErrorText text='Please enter a valid email address' />);
    } else {
      setUpdateEmailError(undefined);
      setUpdateEmailText(undefined);
      updateUser({ variables: { input: { email } } });
    }
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

const AcceptingTripInvitesSelect: React.FC<UserAccountInputProps> = ({
  dispatch,
  user
}) => {
  const [updateText, setUpdateText] = useState<JSX.Element>();
  const [updateError, setUpdateError] = useState<JSX.Element>();

  const [updateUser, { loading }] = useUpdateUserMutation();

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const newValue = target.value as User['accepting_trip_invites'];
    updateUser({ variables: { input: { accepting_trip_invites: newValue } } })
      .then(() => {
        dispatch(setUser({ accepting_trip_invites: newValue }));
        setUpdateError(undefined);
        setUpdateText(<SuccessText />);
      })
      .catch(error => {
        setUpdateError(<ErrorText text={getFirstError(error)} />);
      });
  };

  const helperText = updateError || updateText || (loading && UPDATING_MESSAGE) || '';

  return (
    <TextField
      select
      label='Accepting Trip Invites'
      value={user.accepting_trip_invites}
      onChange={handleOnChange}
      helperText={helperText}
      error={!!updateError}
      fullWidth
      margin='normal'
    >
      {Object.values(AcceptingTripInvites).map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

const UserAccount: React.FC<UserAccountProps> = ({ user }) => {
  const dispatch = useAppDispatch();

  return (
    <UserInfo>
      <h2>Account Details</h2>
      <UserNameInput dispatch={dispatch} user={user} />
      <UserEmailInput dispatch={dispatch} user={user} />
      <AcceptingTripInvitesSelect dispatch={dispatch} user={user} />
    </UserInfo>
  );
};

export default UserAccount;
