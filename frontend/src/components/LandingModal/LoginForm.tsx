import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { setUser } from '../../store/user/actions';
import LandingForm from '../generic/LandingForm/LandingForm';

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password, email: $username) {
      id
    }
  }
`;

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [loginUser, { loading, data }] = useMutation(LOGIN_USER);

  if (data) {
    console.log(data);
    dispatch(setUser(data));
  }

  const handleSubmit = (username: string, password: string) => {
    // console.log(username, password);
    loginUser({ variables: { username, password } });
  };

  return (
    <LandingForm onSubmit={handleSubmit} submitBtnColor='blue' submitBtnText='Login' />
  );
};

export default memo(LoginForm);
