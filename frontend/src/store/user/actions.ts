import {
  UserActionType,
  SetUser,
  SetLoggedIn,
  SetLoading,
  SetViewInfo,
  ResetUserState
} from './types';

export const resetUserState: ResetUserState = () => ({
  type: UserActionType.RESET_STATE
});

export const setLoggedIn: SetLoggedIn = payload => ({
  type: UserActionType.SET_LOGGED_IN,
  payload
});

export const setLoadingUser: SetLoading = payload => ({
  type: UserActionType.SET_LOADING,
  payload
});

export const setViewInfo: SetViewInfo = payload => ({
  type: UserActionType.SET_VIEW_INFO,
  payload
});

export const setUser: SetUser = payload => ({
  type: UserActionType.SET_USER,
  payload
});
