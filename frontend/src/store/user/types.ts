import { Reducer } from 'redux';
import { User } from '../../types/user';
import { ActionWithPayload } from '../../types/store';

// State
export interface UserState extends User {
  isLoggedIn: boolean;
}

// Reducer
export type UserReducer = Reducer<UserState, UserAction>;

// Action types
export enum UserActionType {
  SET_LOGGED_IN = 'SET_LOGGED_IN',
  SET_USER = 'SET_USER'
}

// Actions
export type SetLoggedInAction = ActionWithPayload<
  UserActionType.SET_LOGGED_IN,
  UserState['isLoggedIn']
>;
export type ActionCreatorWithPayload<
  TAction extends ActionWithPayload<string, any>
> = (payload: TAction['payload']) => TAction;

export type SetUserAction = ActionWithPayload<UserActionType.SET_USER, User>;
export type UserAction = SetLoggedInAction | SetUserAction;

// Action creators
export type SetLoggedIn = (payload: SetLoggedInAction['payload']) => SetLoggedInAction;
export type SetUser = (payload: SetUserAction['payload']) => SetUserAction;
