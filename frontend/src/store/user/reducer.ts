import { UserState, Action } from './types';

const { SET_LOGGED_IN, SET_USER } = Action;

const initialState: UserState = {
  isLoggedIn: false,
  id: null,
  username: ''
};

export function userReducer(state = initialState, action: any): UserState {
  const { type, payload } = action;

  if (type === SET_LOGGED_IN) {
    return { ...state, isLoggedIn: payload };
  }

  if (type === SET_USER) {
    return payload;
  }
  return state;
}
