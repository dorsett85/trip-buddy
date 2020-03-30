import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import TransitionModal from '../TransitionModal/TransitionModal';

const NewUserSetupModal: React.FC = () => {

  return (
    <Dialog
      open={true}
      TransitionComponent={TransitionModal}
      maxWidth='xs'
    >
      <DialogTitle>New User Setup</DialogTitle>
      <DialogContent>hello</DialogContent>
    </Dialog>
  );
};

export default NewUserSetupModal;
