import React, { memo } from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { LinearProgress } from '@material-ui/core';
import styled, { css } from 'styled-components';
import TransitionModal from '../TransitionModal/TransitionModal';
import Entry from '../Entry/Entry';
import NewUserSetup from '../NewUserSetup/NewUserSetup';
import { useAppSelector } from '../../store/hooks/useAppSelector';

const LoadingUserContainer = styled.div(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing()};
  `
);

const LoadingUser: React.FC = () => {
  return (
    <LoadingUserContainer>
      <h3>Loading user...</h3>
      <LinearProgress />
    </LoadingUserContainer>
  );
};

const LandingModal: React.FC = () => {
  const userState = useAppSelector(({ user }) => user);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const { loggedIn, setupComplete, data } = userState;
  const show = !loggedIn || !setupComplete;

  const content = !loggedIn ? (
    <Entry />
  ) : data && !setupComplete ? (
    <NewUserSetup newUserSetup={data.new_user_setup} />
  ) : (
    <LoadingUser />
  );

  return (
    <Dialog
      open={show}
      TransitionComponent={TransitionModal}
      fullScreen={fullScreen}
      fullWidth
      maxWidth='xs'
    >
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default memo(LandingModal);
