import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { UserRecord } from 'common/lib/types/user';
import { TextField } from '@material-ui/core';
import styled, { css } from 'styled-components';

interface NewUserSetupProps {
  newUserSetup: UserRecord['new_user_setup'];
}

interface NewUserSteps {
  stepKey: string;
  stepLabel: string;
  completed: boolean;
  Component: React.FC;
}

interface StepMap {
  [key: string]: {
    stepLabel: NewUserSteps['stepLabel'];
    Component: React.FC;
  };
}

const StepContent = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    padding-top: ${theme.spacing('sm')};
    padding-bottom: ${theme.spacing('lg')};
  `
);

const SubmitButton = styled(({ children, ...rest }) => (
  <Button color='primary' variant='contained' type='submit' {...rest}>
    {children}
  </Button>
))(
  ({ theme }) => css`
    margin-top: ${theme.spacing()};
  `
);

const EmailVerified: React.FC = () => {
  const [token, setToken] = useState('');

  const handleOnInput: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setToken(target.value);
  };

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault();
    console.log(token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label='Enter verification token'
          value={token}
          onInput={handleOnInput}
          variant='outlined'
          size='small'
          helperText='Check your email for verification token'
        />
      </div>
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
};

const stepMap: StepMap = {
  email_verified: {
    stepLabel: 'Verify email address',
    Component: props => <EmailVerified />
  },
  username: {
    stepLabel: 'Update username',
    Component: props => <div>Update username</div>
  },
  accepting_trip_invites: {
    stepLabel: 'Accepting trip invites',
    Component: props => <div>Accepting trip invites</div>
  }
};

const getSteps = (newUserSetup: UserRecord['new_user_setup']): NewUserSteps[] => {
  return Object.entries(newUserSetup)
    .filter(([key]) => key !== '__typename')
    .map(([key, value]) => {
      const step = stepMap[key];
      return {
        stepKey: key,
        stepLabel: step.stepLabel,
        completed: value,
        Component: step.Component
      };
    });
};

const NewUserSetup: React.FC<NewUserSetupProps> = ({ newUserSetup }) => {
  const steps = getSteps(newUserSetup);
  const activeStep = steps.findIndex(step => !step.completed);
  const ActiveComponent = steps[activeStep].Component;

  return (
    <div>
      <h2>New User Setup</h2>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(({ stepLabel, completed }) => {
          return (
            <Step key={stepLabel} completed={completed}>
              <StepLabel>{stepLabel}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <StepContent>
        <ActiveComponent />
      </StepContent>
    </div>
  );
};

export default NewUserSetup;
