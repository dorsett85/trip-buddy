import React, { memo, useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { setLoggedIn } from '../../store/user/reducer';
import { getFirstError } from '../../utils/apolloErrors';
import { setLocalToken } from '../../utils/localToken';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { useLoginUserMutation } from '../../api/apollo/graphql';

enum LoginFormInputs {
  username = '',
  password = ''
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loginInputs, setLoginInputs] = useState(LoginFormInputs);
  const { username, password } = loginInputs;
  const [loginError, setLoginError] = useState('');

  // Define login mutation and handlers
  const [loginUserMutation, { loading }] = useLoginUserMutation({
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
    loginUserMutation({ variables: { username, password } });
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
        <Button
          color='primary'
          type='submit'
          variant='contained'
          fullWidth
          disabled={loading}
        >
          Login
        </Button>
        {loading && <LinearProgress />}
      </Box>
    </form>
  );
};

export default memo(LoginForm);
