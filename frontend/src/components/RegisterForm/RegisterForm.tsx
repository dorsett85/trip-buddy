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
import { RegisterFormInputs } from './RegisterForm.types';

const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password)
  }
`;

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
  const dispatch = useDispatch();
  const [registerInputs, setRegisterInputs] = useState(RegisterFormInputs);
  const { email, password } = registerInputs;
  const [registerError, setRegisterError] = useState('');

  // Define registration mutation and handlers
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: data => {
      setRegisterError('');
      localStorage.setItem('token', data.registerUser);
      dispatch(setLoggedIn(true));
    },
    onError: error => {
      const { message } = error.graphQLErrors[0];
      setRegisterError(message);
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
    registerUser({ variables: { email, password } });
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
        <ColoredButton
          clr='green'
          type='submit'
          variant='contained'
          fullWidth
          disabled={loading}
        >
          Register
        </ColoredButton>
        {loading && <LinearProgress />}
      </Box>
    </form>
  );
};

export default memo(RegisterForm);
