import React, { useEffect, useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { UserRecord } from 'common/lib/types/user';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { TextField } from '@material-ui/core';
import styled, { css } from 'styled-components';
import {
  useUpdateUserMutation,
  useVerifyEmailMutation
} from '../ApolloProvider/hooks/user';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { setUser, setSetupCompleted } from '../../store/user/reducer';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../../utils/constants/errors';

type NewUserSetupUpdate<
  TCol extends keyof UserRecord,
  TNewUserSetup extends keyof UserRecord['new_user_setup']
> = Pick<UserRecord, TCol> & {
  // eslint-disable-next-line camelcase
  new_user_setup: Pick<UserRecord['new_user_setup'], TNewUserSetup>;
};

type EmailVerification = NewUserSetupUpdate<'email_verification_token', 'email_verified'>;
type UsernameUpdate = NewUserSetupUpdate<'username', 'username'>;
type AcceptingNewTrips = NewUserSetupUpdate<
  'accepting_trip_invites',
  'accepting_trip_invites'
>;

type UpdateNewUserSetup = EmailVerification | UsernameUpdate | AcceptingNewTrips;

const isEmailVerification = (obj: any): obj is EmailVerification =>
  'email_verification_token' in obj;

interface NewUserSetupProps {
  newUserSetup: UserRecord['new_user_setup'];
}

interface NewUserSteps {
  stepKey: string;
  stepLabel: string;
  completed: boolean;
  Component: React.FC<StepComponentProps>;
}

interface StepMap {
  [key: string]: Pick<NewUserSteps, 'stepLabel' | 'Component'>;
}

interface StepComponentProps {
  onSubmit: (updateNewUserSetup: UpdateNewUserSetup) => void;
  errorMsg: string;
}

const SubmitButton = styled(({ children, ...rest }) => (
  <Button color='primary' variant='contained' type='submit' {...rest}>
    {children}
  </Button>
))(
  ({ theme }) => css`
    margin-top: ${theme.spacing()};
  `
);

const EmailVerified: React.FC<StepComponentProps> = ({ onSubmit, errorMsg }) => {
  const [token, setToken] = useState('');

  const handleOnInput: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setToken(target.value);
  };

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault();
    onSubmit({
      email_verification_token: token,
      new_user_setup: {
        email_verified: true
      }
    });
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
          error={!!errorMsg}
          helperText={errorMsg || 'Check your email for verification token'}
        />
      </div>
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
};

const UpdateUsername: React.FC<StepComponentProps> = ({ onSubmit, errorMsg }) => {
  const [username, setUsername] = useState('');
  const [inputError, setInputError] = useState(false);
  const [helperText, setHelperText] = useState('Create a username for your account');

  useEffect(() => {
    if (errorMsg) {
      setHelperText(errorMsg);
    }
  }, [errorMsg]);

  const handleOnInput: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setUsername(target.value);
  };

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault();
    if (username.length < 4) {
      setInputError(true);
      setHelperText('Must be at least 4 characters');
    } else {
      setInputError(false);
      setHelperText('Create a username for your account');
      onSubmit({
        username,
        new_user_setup: {
          username: true
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label='Enter username'
          value={username}
          onInput={handleOnInput}
          variant='outlined'
          size='small'
          inputProps={{
            minLength: 4
          }}
          error={!!errorMsg || inputError}
          helperText={inputError ? helperText : errorMsg || helperText}
        />
      </div>
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
};

const AcceptingTripInvites: React.FC<StepComponentProps> = ({ onSubmit }) => {
  const [acceptInvites, setAcceptInvites] = useState<
    UserRecord['accepting_trip_invites']
  >('all');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setAcceptInvites(target.value as UserRecord['accepting_trip_invites']);
  };

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault();
    onSubmit({
      accepting_trip_invites: acceptInvites,
      new_user_setup: {
        accepting_trip_invites: true
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>
            Who would you like to accept trip invitations from?
          </FormLabel>
          <RadioGroup
            row
            aria-label='Accepting trip invites'
            name='acceptingTripInvites'
            value={acceptInvites}
            onChange={handleChange}
          >
            <FormControlLabel value='no' control={<Radio color='primary' />} label='Nobody' />
            <FormControlLabel
              value='friends'
              disabled
              control={<Radio color='primary' />}
              label='Friends'
            />
            <FormControlLabel
              value='all'
              control={<Radio color='primary' />}
              label='Everyone'
            />
          </RadioGroup>
        </FormControl>
      </div>
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
};

interface CompletedProps {
  onContinue: () => void;
}

const CompletedContainer = styled.div(
  ({ theme }) => css`
    text-align: center;
    > strong {
      display: block;
      margin-bottom: ${theme.spacing()};
      font-size: 1.2rem;
    }
  `
);

const Completed: React.FC<CompletedProps> = ({ onContinue }) => {
  return (
    <CompletedContainer>
      <strong>All done, enjoy!</strong>
      <Button color='primary' variant='contained' onClick={onContinue}>
        Continue
      </Button>
    </CompletedContainer>
  );
};

const stepMap: StepMap = {
  email_verified: {
    stepLabel: 'Verify email address',
    Component: props => <EmailVerified {...props} />
  },
  username: {
    stepLabel: 'Update username',
    Component: props => <UpdateUsername {...props} />
  },
  accepting_trip_invites: {
    stepLabel: 'Accepting trip invites',
    Component: props => <AcceptingTripInvites {...props} />
  }
};

const getSteps = (newUserSetup: UserRecord['new_user_setup']): NewUserSteps[] => {
  return Object.entries(newUserSetup).map(([key, value]) => {
    const step = stepMap[key];
    return {
      stepKey: key,
      stepLabel: step.stepLabel,
      completed: value,
      Component: step.Component
    };
  });
};

const StepContent = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    padding-top: ${theme.spacing('sm')};
    padding-bottom: ${theme.spacing('lg')};
  `
);

const NewUserSetup: React.FC<NewUserSetupProps> = ({ newUserSetup }) => {
  const dispatch = useAppDispatch();
  const [errorMsg, setErrorMsg] = useState('');
  const [updateUserMutation] = useUpdateUserMutation();
  const [verifyEmailMutation] = useVerifyEmailMutation();
  const steps = getSteps(newUserSetup);

  // Check if all of the steps have been completed. If they have not then we'll
  // set the active step to the index of the last incomplete step. If all of the steps
  // are complete then the active step will be the last index of the steps (so they
  // all show completed checkboxes in the stepper.
  const allComplete = Object.values(newUserSetup).every(Boolean);
  const activeStep = !allComplete
    ? steps.findIndex(step => !step.completed)
    : steps.length - 1;

  const handleSubmit = (updateNewUserSetup: UpdateNewUserSetup) => {
    if (isEmailVerification(updateNewUserSetup)) {
      verifyEmailMutation({
        variables: { token: updateNewUserSetup.email_verification_token }
      })
        .then(({ data }) => {
          // Check if data returns anything, meaning it was able to successfully verify
          // the email address and update the user record
          if (data.verifyEmail) {
            setErrorMsg('');
            dispatch(
              setUser({
                email_verified: true,
                new_user_setup: {
                  ...newUserSetup,
                  email_verified: true
                }
              })
            );
          } else {
            // No data means we didn't find a matching email verification token
            setErrorMsg('The token provided does not match our records');
          }
        })
        .catch(err => {
          setErrorMsg(err.message);
        });
    } else {
      // This funky destructuring will serve as the input object for our updateUserMutation call.
      // We are going to destructure the updateNewUserSetup object to get column in the users
      // table that needs to be updated. We'll also destructure the existing newUserSetup state
      // and add the new setup properties from updateNewUserSetup.new_user_setup.
      // The result would look something like:
      // {
      //   username: 'clayton',
      //   new_user_setup: {
      //     email_verified: true,
      //     username: true,
      //     accepting_trip_invites: false
      //   }
      // The is the object that will eventually be fed as update arguments for our backend model.
      const input = {
        ...updateNewUserSetup,
        new_user_setup: {
          ...newUserSetup,
          ...updateNewUserSetup.new_user_setup
        }
      };
      updateUserMutation({ variables: { input } })
        .then(({ data }) => {
          // Check if data returns anything, meaning it was able to successfully
          // update the user record
          if (data.updateUser) {
            setErrorMsg('');
            dispatch(setUser(input));
          } else {
            throw Error(INTERNAL_SERVER_ERROR_MESSAGE);
          }
        })
        .catch(err => {
          const errMsg = err.message.includes('duplicate key value')
            ? 'Username already exists'
            : err.message;
          setErrorMsg(errMsg);
        });
    }
    // Send updates to users table
  };

  const handleContinue = () => {
    dispatch(setSetupCompleted(true));
  };

  let activeComponent: React.ReactNode;
  if (!allComplete) {
    const { Component } = steps[activeStep];
    activeComponent = <Component onSubmit={handleSubmit} errorMsg={errorMsg} />;
  } else {
    activeComponent = <Completed onContinue={handleContinue} />;
  }

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
      <StepContent>{activeComponent}</StepContent>
    </div>
  );
};

export default NewUserSetup;
