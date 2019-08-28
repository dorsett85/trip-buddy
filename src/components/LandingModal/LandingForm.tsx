import React, { useState, memo, useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import ColoredButton from '../Buttons/ColoredButton';
import { setUser } from '../../store/user/actions';
import { LandingFormInputs } from './types';

interface LandingFormProps {
  action: 'login' | 'register';
}

const Login: React.FC<LandingFormProps> = props => {
  const [loginInputs, setLoginInputs] = useState(LandingFormInputs);
  const { username, password } = loginInputs;
  const { action } = props;
  const dispatch = useDispatch();

  // Modify form when the action prop changes
  useEffect(() => {
    // TODO form resets on prop change
    console.log(action);
  }, [action])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInputs({
      ...loginInputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setUser({ id: 1, username: 'clayton' }));
  };

  // Set the button background and text based on the action
  const [btnBackground, btnText] =
    action === 'login' ? ['blue.500', 'Login'] : ['green.500', 'Register'];

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
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormGroup>
      <p>
        <ColoredButton
          bgClr={btnBackground}
          clr='white'
          type='submit'
          variant='contained'
          fullWidth
        >
          {btnText}
        </ColoredButton>
      </p>
    </form>
  );
};

export default memo(Login);
