import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user/reducer';
import { tripReducer } from './trip/reducer';
import { AppState } from './types';
import { generalReducer } from './general/reducer';

const appReducers = {
  general: generalReducer,
  user: userReducer,
  trip: tripReducer
};

const rootReducer = combineReducers<AppState>(appReducers);

const store = configureStore({
  reducer: rootReducer
});

export default store;
