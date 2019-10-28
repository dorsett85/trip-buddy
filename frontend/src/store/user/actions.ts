import { UserActionType, SetUser, SetLoggedIn,  } from './types';

export const setLoggedIn: SetLoggedIn = payload => ({
  type: UserActionType.SET_LOGGED_IN,
  payload
});

export const setUser: SetUser = payload => ({
  type: UserActionType.SET_USER,
  payload
});
