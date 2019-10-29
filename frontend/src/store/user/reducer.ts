import { UserState, UserReducer, UserActionType } from './types';

const { SET_LOGGED_IN, SET_USER } = UserActionType;

const initialState: UserState = {
  isLoggedIn: false
};

export const userReducer: UserReducer = (state = initialState, action) => {
  if (action.type === SET_LOGGED_IN) {
    return { isLoggedIn: action.payload };
  }

  if (action.type === SET_USER) {
    return { ...state, ...action.payload };
  }
  return state;
};
