/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ApolloError } from 'apollo-client';
import { GraphQLError } from 'graphql';
import LoginForm from './LoginForm';
import store from '../../store';
import { LoginUserDocument } from "../../api/apollo/graphql";

let loginMutationCalled = false;
const ERROR_MESSAGE = 'User does not exist';
const mocks = [
  {
    request: {
      query: LoginUserDocument,
      variables: {
        username: 'clayton',
        password: 'password123'
      }
    },
    result: () => {
      loginMutationCalled = true;
      return {
        data: {
          loginUser: 'TOKEN'
        }
      };
    }
  },
  {
    request: {
      query: LoginUserDocument,
      variables: {
        username: 'invalid',
        password: 'user'
      }
    },
    result: () => {
      loginMutationCalled = true;
      const error = new ApolloError({
        errorMessage: ERROR_MESSAGE,
        graphQLErrors: [
          {
            message: ERROR_MESSAGE
          }
        ] as GraphQLError[]
      });
      return {
        errors: [error],
        data: {
          loginUser: null
        }
      };
    }
  }
];

const loginFormWithProviders = (
  <Provider store={store}>
    <MockedProvider mocks={mocks} addTypename={false}>
      <LoginForm />
    </MockedProvider>
  </Provider>
);

afterEach(() => {
  loginMutationCalled = false;
});

describe('LoginForm component', () => {
  it('should successfully submit', async () => {
    const { container } = render(loginFormWithProviders);
    const form = container.querySelector('form');
    const [usernameInput, passwordInput] = container.querySelectorAll('input[value=""');

    fireEvent.change(usernameInput, { target: { value: 'clayton' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form!);
    await waitForDomChange();

    expect(loginMutationCalled).toBe(true);
  });

  it('should return error text', async () => {
    const { container } = render(loginFormWithProviders);
    const form = container.querySelector('form');
    const [usernameInput, passwordInput] = container.querySelectorAll('input[value=""');

    fireEvent.change(usernameInput, { target: { value: 'invalid' } });
    fireEvent.change(passwordInput, { target: { value: 'user' } });
    fireEvent.submit(form!);
    await waitForDomChange();

    expect(loginMutationCalled).toBe(true);
    const hasErrorMessage = container.textContent!.includes(ERROR_MESSAGE);
    expect(hasErrorMessage).toBe(true);
  });
});
