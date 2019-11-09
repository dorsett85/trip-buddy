import { UserActionType, SetUser, SetLoggedIn, SetLoading } from './types';

export const setLoggedIn: SetLoggedIn = payload => ({
  type: UserActionType.SET_LOGGED_IN,
  payload
});

export const setLoadingUser: SetLoading = payload => ({
  type: UserActionType.SET_LOADING,
  payload
});

export const setUser: SetUser = payload => ({
  type: UserActionType.SET_USER,
  payload
});
