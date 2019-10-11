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
import { RegisterFormInputs } from './RegisterForm.types';

const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      id
    }
  }
`;

const inputProps = {
  minLength: 4,
  maxLength: 12
};

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const [registerUser, { loading, data }] = useMutation(REGISTER_USER);
  const [registerInputs, setRegisterInputs] = useState(RegisterFormInputs);
  const { email, password } = registerInputs;

  if (data) {
    dispatch(setUser(data));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser({ variables: { email, password } });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInputs({
      ...registerInputs,
      [e.target.name]: e.target.value
    });
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
