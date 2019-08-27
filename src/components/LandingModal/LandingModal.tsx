import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import LandingModalContent from './LandingModalContent';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);

const LandingModal: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <Modal
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropProps={{
        timeout: 500
      }}
    >
      <Slide direction='up' in={open}>
        <div>
          <LandingModalContent />
        </div>
      </Slide>
    </Modal>
  );
};

export default LandingModal;
