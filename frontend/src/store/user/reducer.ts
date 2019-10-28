import { UserState, UserReducer, UserActionType } from './types';
import { User } from '../../types/user';

const { SET_LOGGED_IN, SET_USER } = UserActionType;

const initialState: UserState = {
  isLoggedIn: false
};

export const userReducer: UserReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === SET_LOGGED_IN) {
    return { isLoggedIn: payload as boolean };
  }

  if (type === SET_USER) {
    return { ...state, ...payload as User };
  }
  return state;
}
