import { UserState, Action, UserActionTypes } from './types';

const initialState: UserState = {
  id: null,
  username: ''
};

const { SET_USER } = Action;

export function userReducer(state = initialState, action: UserActionTypes): UserState {
  const { type, payload } = action;
  if (type === SET_USER) {
    return payload;
  }
  return state;
}
