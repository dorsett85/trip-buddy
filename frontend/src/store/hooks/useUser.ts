import { useAppSelector } from './useAppSelector';
import { UserState } from '../user/types';
import { useAppShallowEqualSelector } from './useAppShallowEqualSelector';

// Convenience hooks for accessing state on the user store

const isLoggedInAndConnected = (user: UserState) =>
  user.loggedIn && user.subscriptionConnected;

export const useUserLoggedIn = () => useAppSelector(({ user }) => user.loggedIn);

export const useUserLoggedInAndConnected = () =>
  useAppSelector(({ user }) => isLoggedInAndConnected(user));

export const useUserSetupData = () =>
  useAppShallowEqualSelector(
    ({ user }) => isLoggedInAndConnected(user) && !user.setupComplete && user.data
  );

export const useUserData = () =>
  useAppShallowEqualSelector(
    ({ user }) => isLoggedInAndConnected(user) && user.setupComplete && user.data
  );
