import { Action, UserState, UserActionTypes } from './types';

export const setUser = (payload: UserState): UserActionTypes => (
  { type: Action.SET_USER, payload }
)