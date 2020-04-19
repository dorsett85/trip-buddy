import { useAppSelector } from './useAppSelector';

// Convenience hooks for accessing state on the user store

export const useUserLoggedIn = () => useAppSelector(({ user }) => user.loggedIn);

export const useUserReady = () =>
  useAppSelector(({ user }) => user.loggedIn && user.subscriptionConnected);

export const useUserSettingUp = () =>
  useAppSelector(
    ({ user }) => user.loggedIn && user.subscriptionConnected && !user.setupComplete
  );
