import {
  UserActionType,
  SetUser,
  SetLoading,
  ResetUserState,
  SetLoggedIn
} from './types';

export const resetUserState: ResetUserState = () => ({
  type: UserActionType.RESET_STATE
});

export const setLoadingUser: SetLoading = payload => ({
  type: UserActionType.SET_LOADING,
  payload
});

export const setLoggedIn: SetLoggedIn = payload => ({
  type: UserActionType.SET_LOGGED_IN,
  payload
});

export const setUser: SetUser = payload => ({
  type: UserActionType.SET_USER,
  payload
});
