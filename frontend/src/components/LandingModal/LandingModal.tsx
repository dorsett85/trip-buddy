import React, { memo } from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { ShowProps } from '../../types/componentProps';
import TransitionModal from '../TransitionModal/TransitionModal';
import Entry from "../Entry/Entry";
import NewUserSetup from "../NewUserSetup/NewUserSetup";

const LandingModal: React.FC<ShowProps> = ({ show }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog
      open={show}
      TransitionComponent={TransitionModal}
      fullScreen={fullScreen}
      fullWidth
      maxWidth='xs'
    >
      <DialogContent>
        <Entry />
        <NewUserSetup />
      </DialogContent>
    </Dialog>
  );
};

export default memo(LandingModal);
