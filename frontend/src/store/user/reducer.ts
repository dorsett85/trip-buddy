import { UserState, UserReducer } from './types';

const initialState: UserState = {
  loggedIn: false,
  loading: false,
  viewInfo: false
};

export const userReducer: UserReducer = (state = initialState, action): UserState => {
  if (action.type === 'RESET_STATE') {
    return initialState;
  }

  if (action.type === 'SET_LOGGED_IN') {
    return { ...state, loggedIn: action.payload, loading: false };
  }

  if (action.type === 'SET_LOADING') {
    return { ...state, loading: action.payload };
  }

  if (action.type === 'SET_VIEW_INFO') {
    return { ...state, viewInfo: action.payload };
  }

  if (action.type === 'SET_USER') {
    return { ...state, ...action.payload };
  }

  return state;
};
