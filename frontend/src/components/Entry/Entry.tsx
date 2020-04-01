import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

const ToggleButtonStyled = styled(ToggleButton)``;
const ToggleButtonGroupStyled = styled(ToggleButtonGroup)`
  width: 100%;
  ${ToggleButtonStyled} {
    width: 50%;
  }
`;

const Entry = () => {
  const [tabValue, setTabValue] = useState('login');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };
  
  const form = tabValue === 'login' ? <LoginForm /> : <RegisterForm />;

  return (
    <div>
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
        {form}
      </Box>
    </div>
  );
};

export default Entry;
