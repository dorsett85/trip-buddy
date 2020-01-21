/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { GeneralState, GeneralSliceCaseReducers } from './types';

const initialState: GeneralState = {
  drawer: {
    open: false,
    content: undefined
  },
  flyTo: undefined
};

const reducers: GeneralSliceCaseReducers = {
  resetGeneralState: () => initialState,
  setDrawer: (state, action) => {
    state.drawer = {
      ...state.drawer,
      ...action.payload
    }
  },
  setFlyTo: (state, action) => {
    state.flyTo = action.payload;
  }
}

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers
});

export const {
  resetGeneralState,
  setDrawer,
  setFlyTo
} = generalSlice.actions;

export const generalReducer = generalSlice.reducer;