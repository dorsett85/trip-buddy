import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import LandingForm from './LandingForm';
import { AppState } from '../../store';
import TabBar from '../generic/TabBar/TabBar';
import { LandingFormType } from './LandingModal.types';

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => {
  return <Slide direction='up' ref={ref} {...props} />;
});

const LandingModal: React.FC = () => {
  const user = useSelector((store: AppState) => store.user, shallowEqual);
  const [tabValue, setTabValue] = useState('login');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Dialog open={!user.id} TransitionComponent={Transition} fullScreen={fullScreen}>
      <DialogContent>
        <Box pb={2}>
          <Typography variant='h4' align='center'>
            Trip Buddy
          </Typography>
          <Typography variant='subtitle1' align='center'>
            Plan your perfect trip!
          </Typography>
        </Box>
        <TabBar
          tabsProps={{
            value: tabValue,
            onChange: handleChange
          }}
        >
          <Tab label='Login' value='login' />
          <Tab label='Register' value='register' />
        </TabBar>
        <Box pt={3} p={1}>
          <LandingForm action={tabValue as LandingFormType} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LandingModal;