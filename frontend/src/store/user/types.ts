import { Reducer, Action, ActionCreator } from 'redux';
import { User } from '../../types/user';
import { ActionWithPayload, GenericActionCreator } from '../../types/store';

// State
export type UserInfoType = 'profile' | 'account';
export interface UserState extends Partial<User> {
  loggedIn: boolean;
  loading: boolean;
  viewInfo: UserInfoType | false;
}

// Reducer
export type UserReducer = Reducer<UserState, UserAction>;

// Action types
export enum UserActionType {
  RESET_STATE = 'RESET_STATE',
  SET_LOGGED_IN = 'SET_LOGGED_IN',
  SET_LOADING = 'SET_LOADING',
  SET_VIEW_INFO = 'SET_VIEW_INFO',
  SET_USER = 'SET_USER'
}

// Actions
export type ResetStateAction = Action<UserActionType.RESET_STATE>;
export type SetLoggedInAction = ActionWithPayload<
  UserActionType.SET_LOGGED_IN,
  UserState['loggedIn']
>;
export type SetLoadingAction = ActionWithPayload<
  UserActionType.SET_LOADING,
  UserState['loading']
>;
export type SetViewInfoAction = ActionWithPayload<
  UserActionType.SET_VIEW_INFO,
  UserState['viewInfo']
>;
export type SetUserAction = ActionWithPayload<UserActionType.SET_USER, Partial<User>>;
export type UserAction =
  | ResetStateAction
  | SetLoggedInAction
  | SetLoadingAction
  | SetViewInfoAction
  | SetUserAction;

// Action creators
export type ResetUserState = ActionCreator<ResetStateAction>;
export type SetLoggedIn = GenericActionCreator<SetLoggedInAction>;
export type SetLoading = GenericActionCreator<SetLoadingAction>;
export type SetViewInfo = GenericActionCreator<SetViewInfoAction>;
export type SetUser = GenericActionCreator<SetUserAction>;
