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
import {useRegisterUserMutation} from "../../api/apollo/hooks/user";

enum RegisterFormInputs {
  email = '',
  password = ''
}

const inputProps = {
  minLength: 4
};

const emailInputProps = {
  ...inputProps,
  maxLength: 50
};

const passwordInputProps = {
  ...inputProps,
  maxLength: 12
};

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [registerInputs, setRegisterInputs] = useState(RegisterFormInputs);
  const { email, password } = registerInputs;
  const [registerError, setRegisterError] = useState('');

  // Define registration mutation and handlers
  const [registerUserMutation, { loading }] = useRegisterUserMutation({
    onCompleted: data => {
      setRegisterError('');
      setLocalToken(data.registerUser);
      dispatch(setLoggedIn(true));
    },
    onError: error => {
      setRegisterError(getFirstError(error));
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInputs({
      ...registerInputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUserMutation({ variables: { email, password } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <TextField
          onChange={handleChange}
          value={email}
          name='email'
          label='Email'
          placeholder='enter email'
          variant='outlined'
          margin='normal'
          required
          error={!!registerError}
          inputProps={emailInputProps}
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
          error={!!registerError}
          helperText={registerError}
          inputProps={passwordInputProps}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormGroup>
      <Box pt={1}>
        <Button
          color='secondary'
          type='submit'
          variant='contained'
          fullWidth
          disabled={loading}
        >
          Register
        </Button>
        {loading && <LinearProgress />}
      </Box>
    </form>
  );
};

export default memo(RegisterForm);
