import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import ColoredButton from '../generic/ColoredButton/ColoredButton';
import { setUser } from '../../store/user/actions';
import { LoginFormInputs } from './LoginForm.types';

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password)
  }
`;

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER);
  const [loginInputs, setLoginInputs] = useState(LoginFormInputs);
  const { username, password } = loginInputs;
  const [loginError, setLoginError] = useState('');
  const [enableError, setEnableError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnableError(false);
    setLoginError('');
    setLoginInputs({
      ...loginInputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnableError(true);
    loginUser({ variables: { username, password } });
  };

  if (data) {
    console.log(data.loginUser);
    dispatch(setUser(data));
  }

  // Update the UI with error message from the graphql request
  if (error && enableError) {
    const { message } = error.graphQLErrors[0];
    if (loginError !== message) {
      setLoginError(message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <TextField
          onChange={handleChange}
          value={username}
          name='username'
          label='Username or Email'
          placeholder='enter username or email'
          variant='outlined'
          margin='normal'
          required
          error={!!loginError}
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
          error={!!loginError}
          helperText={loginError}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormGroup>
      <Box pt={1}>
        <ColoredButton
          clr='blue'
          type='submit'
          variant='contained'
          fullWidth
          disabled={loading}
        >
          Login
        </ColoredButton>
        {loading && <LinearProgress />}
      </Box>
    </form>
  );
};

export default memo(LoginForm);
