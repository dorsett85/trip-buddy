import React, { memo } from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TransitionModal from '../TransitionModal/TransitionModal';
import Entry from '../Entry/Entry';
import { UserState } from '../../store/user/types';
import NewUserWizard from '../NewUserWizard/NewUserWizard';

interface LandingModalProps {
  userState: UserState;
}

const LandingModal: React.FC<LandingModalProps> = ({ userState }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const { loggedIn, setupComplete, data } = userState;
  const show = !loggedIn || !setupComplete;

  const content = !loggedIn ? <Entry /> : data ? <NewUserWizard newUserSetup={data.new_user_setup} /> : null;

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
