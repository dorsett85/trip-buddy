import { UserState, UserReducer } from './types';

const initialState: UserState = {
  loggedIn: false,
  loading: false
};

export const userReducer: UserReducer = (state = initialState, action): UserState => {
  if (action.type === 'SET_LOGGED_IN') {
    return { loggedIn: action.payload, loading: false };
  }

  if (action.type === 'SET_LOADING') {
    return { ...state, loading: action.payload };
  }

  if (action.type === 'SET_USER') {
    return { ...state, ...action.payload };
  }
  return state;
};
