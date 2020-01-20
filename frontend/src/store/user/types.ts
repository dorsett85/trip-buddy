import { Reducer, Action, ActionCreator } from 'redux';
import { User } from '../../types/user';
import { GenericAction, GenericActionCreator } from '../utils.types';

// State
export interface UserState {
  /**
   * If the user data is being requested
   */
  loading: boolean;
  /**
   * If the user is logged in (i.e., the local jwt token is saved
   * in local storage)
   */
  loggedIn: boolean;
  /**
   * Record of the logged in user
   */
  data: User | undefined;
}

// Reducer
export type UserReducer = Reducer<UserState, UserAction>;

// Action types
export enum UserActionType {
  RESET_STATE = 'RESET_STATE',
  SET_LOADING = 'SET_LOADING',
  SET_LOGGED_IN = 'SET_LOGGED_IN',
  SET_USER = 'SET_USER'
}

// Actions
export type ResetUserStateAction = Action<UserActionType.RESET_STATE>;
export type SetLoadingAction = GenericAction<
  UserActionType.SET_LOADING,
  UserState['loading']
>;
export type SetLoggedInAction = GenericAction<
  UserActionType.SET_LOGGED_IN,
  UserState['loggedIn']
>;
export type SetUserAction = GenericAction<UserActionType.SET_USER, Partial<User>>;
export type UserAction =
  | ResetUserStateAction
  | SetLoadingAction
  | SetLoggedInAction
  | SetUserAction;

// Action creators
export type ResetUserState = ActionCreator<ResetUserStateAction>;
export type SetLoading = GenericActionCreator<SetLoadingAction>;
export type SetLoggedIn = GenericActionCreator<SetLoggedInAction>;
export type SetUser = GenericActionCreator<SetUserAction>;
