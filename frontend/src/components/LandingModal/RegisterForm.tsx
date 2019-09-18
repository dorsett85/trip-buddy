import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { setUser } from '../../store/user/actions';
import LandingForm from '../generic/LandingForm/LandingForm';

const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    registerUser(username: $username, password: $password, email: $username) {
      id
    }
  }
`;

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const [registerUser, { loading, data }] = useMutation(REGISTER_USER);

  if (data) {
    dispatch(setUser(data));
  }

  const handleSubmit = (username: string, password: string) => {
    registerUser({ variables: { username, password } });

    // graphqlPost('/api', mutation).then(data => console.log(data));
    // dispatch(setUser({ id: 1, username: 'clayton' }));
  };

  return (
    <LandingForm
      onSubmit={handleSubmit}
      inputProps={{
        minLength: 4,
        maxLength: 12
      }}
      submitBtnColor='green'
      submitBtnText='Register'
    />
  );
};

export default memo(RegisterForm);
