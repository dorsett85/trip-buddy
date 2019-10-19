import { Action, SetUserAction, SetLoggedInAction } from './types';

export const setLoggedIn = (
  payload: SetLoggedInAction['payload']
): SetLoggedInAction => ({
  type: Action.SET_LOGGED_IN,
  payload
});

export const setUser = (payload: SetUserAction['payload']): SetUserAction => ({
  type: Action.SET_USER,
  payload
});
