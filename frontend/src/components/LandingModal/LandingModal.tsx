import React, { useState, memo } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import styled from 'styled-components';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { ShowProps } from '../../types/componentProps';

interface LandingFormProps {
  formType: string;
}

const ToggleButtonStyled = styled(ToggleButton)``;
const ToggleButtonGroupStyled = styled(ToggleButtonGroup)`
  width: 100%;
  ${ToggleButtonStyled} {
    width: 50%;
  }
`;

const LandingForm: React.FC<LandingFormProps> = ({ formType }) =>
  formType === 'login' ? <LoginForm /> : <RegisterForm />;

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => {
  return <Slide direction='up' ref={ref} {...props} />;
});

const LandingModal: React.FC<ShowProps> = ({ show }) => {
  const [tabValue, setTabValue] = useState('login');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Dialog open={show} TransitionComponent={Transition} fullScreen={fullScreen} fullWidth maxWidth='xs'>
      <DialogContent>
        <Box pb={2}>
          <Typography variant='h4' align='center'>
            Trip Buddy
          </Typography>
          <Typography variant='subtitle1' align='center'>
            Plan your perfect trip!
          </Typography>
        </Box>
        <ToggleButtonGroupStyled exclusive value={tabValue} onChange={handleChange}>
          <ToggleButtonStyled value='login'>Login</ToggleButtonStyled>
          <ToggleButtonStyled value='register'>Register</ToggleButtonStyled>
        </ToggleButtonGroupStyled>
        <Box pt={2} pb={1}>
          <LandingForm formType={tabValue} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default memo(LandingModal);
