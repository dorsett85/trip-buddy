/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import LoginForm, { LOGIN_USER } from './LoginForm';
import store from '../../store';

let loginMutationCalled = false;
const mocks = [
  {
    request: {
      query: LOGIN_USER,
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
    fireEvent.submit(form);
    await waitForDomChange(container);

    expect(loginMutationCalled).toBe(true);
  });

  it('should return error text', async () => {
    // TODO
  });
});
