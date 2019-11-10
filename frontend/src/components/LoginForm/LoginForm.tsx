import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import ColoredButton from '../generic/ColoredButton/ColoredButton';
import { setLoggedIn } from '../../store/user/actions';
import { LoginFormInputs } from './LoginForm.types';
import { getFirstError } from '../../utils/apolloErrors';
import { setLocalToken } from '../../utils/localToken';

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password)
  }
`;

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [loginInputs, setLoginInputs] = useState(LoginFormInputs);
  const { username, password } = loginInputs;
  const [loginError, setLoginError] = useState('');

  // Define login mutation and handlers
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: data => {
      setLoginError('');
      setLocalToken(data.loginUser);
      dispatch(setLoggedIn(true));
    },
    onError: error => {
      setLoginError(getFirstError(error));
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginError('');
    setLoginInputs({
      ...loginInputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({ variables: { username, password } });
  };

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
          color='blue'
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
