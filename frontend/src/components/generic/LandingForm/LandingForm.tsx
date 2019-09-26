import React, { memo, useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import ColoredButton from '../ColoredButton/ColoredButton';
import { LandingFormProps, LandingFormInputs, FormVals } from './LandingForm.types';

const getFormVals = (action: string): FormVals => ({
  usernameLabel: action === 'login' ? 'Username or Email' : 'Email',
  usernamePlaceholder: action === 'login' ? 'enter username or email' : 'enter email',
  submitBtnColor: action === 'login' ? 'blue' : 'green',
  submitBtnText: action === 'login' ? 'Login' : 'Register',
  inputProps:
    action === 'login'
      ? {}
      : {
          minLength: 4,
          maxLength: 12
        }
});

const LandingForm: React.FC<LandingFormProps> = ({ action, onSubmit }) => {
  const [loginInputs, setLoginInputs] = useState(LandingFormInputs);
  const { username, password } = loginInputs;
  const formVals = getFormVals(action);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInputs({
      ...loginInputs,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <TextField
          onChange={handleChange}
          value={username}
          name='username'
          label={formVals.usernameLabel}
          placeholder={formVals.usernamePlaceholder}
          variant='outlined'
          margin='normal'
          required
          inputProps={formVals.inputProps}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          onChange={handleChange}
          value={password}
          name='password'
          label='Password'
          placeholder='enter password...'
          variant='outlined'
          margin='normal'
          required
          inputProps={formVals.inputProps}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormGroup>
      <p>
        <ColoredButton
          clr={formVals.submitBtnColor}
          type='submit'
          variant='contained'
          fullWidth
        >
          {formVals.submitBtnText}
        </ColoredButton>
      </p>
    </form>
  );
};

export default memo(LandingForm);
