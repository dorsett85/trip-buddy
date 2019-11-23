import { UserState, UserReducer } from './types';

const initialState: UserState = {
  loggedIn: false,
  loading: false,
  viewProfile: false,
  viewAccount: false
};

export const userReducer: UserReducer = (state = initialState, action): UserState => {
  if (action.type === 'SET_LOGGED_IN') {
    return { ...state, loggedIn: action.payload, loading: false };
  }

  if (action.type === 'SET_LOADING') {
    return { ...state, loading: action.payload };
  }

  if (action.type === 'SET_VIEW_PROFILE') {
    return { ...state, viewProfile: action.payload };
  }

  if (action.type === 'SET_VIEW_ACCOUNT') {
    return { ...state, viewAccount: action.payload };
  }

  if (action.type === 'SET_USER') {
    return { ...state, ...action.payload };
  }

  return state;
};
