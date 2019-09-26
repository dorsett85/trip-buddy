import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { setUser } from '../../store/user/actions';
import LandingForm from '../generic/LandingForm/LandingForm';

const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
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

  const handleSubmit = (email: string, password: string) => {
    registerUser({ variables: { email, password } });
  };

  return <LandingForm action='register' onSubmit={handleSubmit} />;
};

export default memo(RegisterForm);
