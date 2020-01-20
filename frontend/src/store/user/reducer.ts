import { UserState, UserReducer } from './types';

const initialState: UserState = {
  loading: false,
  loggedIn: false,
  data: undefined
};

export const userReducer: UserReducer = (state = initialState, action): UserState => {
  if (action.type === 'RESET_STATE') {
    return initialState;
  }

  if (action.type === 'SET_LOADING') {
    return { ...state, loading: action.payload };
  }

  if (action.type === 'SET_LOGGED_IN') {
    return { ...state, loggedIn: action.payload, loading: false };
  }

  if (action.type === 'SET_USER') {
    const data = action.payload && {
      ...state.data!,
      ...action.payload
    };
    return { ...state, data };
  }

  return state;
};
