/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { UserState, UserSliceCaseReducers } from './types';

const initialState: UserState = {
  loading: false,
  loggedIn: false,
  setupComplete: false,
  data: undefined
};

const reducers: UserSliceCaseReducers = {
  resetUserState: () => initialState,
  setLoadingUser: (state, { payload }) => {
    state.loading = payload;
  },
  setLoggedIn: (state, { payload }) => {
    state.loggedIn = payload;
  },
  setSetupCompleted: (state, { payload }) => {
    state.setupComplete = payload;
  },
  setUser: (state, { payload }) => {
    state.data = payload && {
      ...state.data!,
      ...payload
    };
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers
});

export const {
  resetUserState,
  setLoadingUser,
  setLoggedIn,
  setSetupCompleted,
  setUser
} = userSlice.actions;

export const userReducer = userSlice.reducer;
