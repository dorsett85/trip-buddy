import {
  UserActionType,
  SetUser,
  SetLoggedIn,
  SetLoading,
  SetViewProfile,
  SetViewAccount
} from './types';

export const setLoggedIn: SetLoggedIn = payload => ({
  type: UserActionType.SET_LOGGED_IN,
  payload
});

export const setLoadingUser: SetLoading = payload => ({
  type: UserActionType.SET_LOADING,
  payload
});

export const setViewProfile: SetViewProfile = payload => ({
  type: UserActionType.SET_VIEW_PROFILE,
  payload
});

export const setViewAccount: SetViewAccount = payload => ({
  type: UserActionType.SET_VIEW_ACCOUNT,
  payload
});

export const setUser: SetUser = payload => ({
  type: UserActionType.SET_USER,
  payload
});
