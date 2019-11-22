import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { userReducer } from './user/reducer';
import { tripReducer } from './trip/reducer';
import { AppState } from './types';
import { generalReducer } from './general/reducer';

const rootReducer = combineReducers<AppState>({
  general: generalReducer,
  user: userReducer,
  trip: tripReducer
});

export type AppState = ReturnType<typeof rootReducer>;

function configureStore(): Store<AppState> {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer, undefined, middleWareEnhancer);
  return store;
}

export default configureStore();
