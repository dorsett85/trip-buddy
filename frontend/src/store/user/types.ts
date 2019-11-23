import { Reducer } from 'redux';
import { User } from '../../types/user';
import { ActionWithPayload, GenericActionCreator } from '../../types/store';

// State
export interface UserState extends Partial<User> {
  loggedIn: boolean;
  loading: boolean;
  viewProfile: boolean;
  viewAccount: boolean;
}

// Reducer
export type UserReducer = Reducer<UserState, UserAction>;

// Action types
export enum UserActionType {
  SET_LOGGED_IN = 'SET_LOGGED_IN',
  SET_LOADING = 'SET_LOADING',
  SET_VIEW_PROFILE = 'SET_VIEW_PROFILE',
  SET_VIEW_ACCOUNT = 'SET_VIEW_ACCOUNT',
  SET_USER = 'SET_USER'
}

// Actions
export type SetLoggedInAction = ActionWithPayload<
  UserActionType.SET_LOGGED_IN,
  UserState['loggedIn']
>;
export type SetLoadingAction = ActionWithPayload<
  UserActionType.SET_LOADING,
  UserState['loading']
>;
export type SetViewProfileAction = ActionWithPayload<
  UserActionType.SET_VIEW_PROFILE,
  UserState['viewProfile']
>;
export type SetViewAccountAction = ActionWithPayload<
  UserActionType.SET_VIEW_ACCOUNT,
  UserState['viewAccount']
>;
export type SetUserAction = ActionWithPayload<UserActionType.SET_USER, User>;
export type UserAction =
  | SetLoggedInAction
  | SetLoadingAction
  | SetUserAction
  | SetViewProfileAction
  | SetViewAccountAction;

// Action creators
export type SetLoggedIn = GenericActionCreator<SetLoggedInAction>;
export type SetLoading = GenericActionCreator<SetLoadingAction>;
export type SetViewProfile = GenericActionCreator<SetViewProfileAction>;
export type SetViewAccount = GenericActionCreator<SetViewAccountAction>;
export type SetUser = GenericActionCreator<SetUserAction>;
