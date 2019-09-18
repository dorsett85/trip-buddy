import React, { memo, useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import ColoredButton from '../ColoredButton/ColoredButton';
import { LandingFormProps, LandingFormInputs } from './LandingForm.types';

const LandingForm: React.FC<LandingFormProps> = ({
  onSubmit,
  inputProps,
  submitBtnColor = 'blue',
  submitBtnText
}) => {
  const [loginInputs, setLoginInputs] = useState(LandingFormInputs);
  const { username, password } = loginInputs;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  }

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
          label='Username'
          placeholder='enter username...'
          variant='outlined'
          margin='normal'
          required
          inputProps={inputProps}
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
          inputProps={inputProps}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormGroup>
      <p>
        <ColoredButton clr={submitBtnColor} type='submit' variant='contained' fullWidth>
          {submitBtnText}
        </ColoredButton>
      </p>
    </form>
  );
};

export default memo(LandingForm);
