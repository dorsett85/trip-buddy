import { createStore, combineReducers, applyMiddleware, Store, Action } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { userReducer } from './user/reducer';
import { AppState, AppActionTypes } from './types';

const rootReducer = combineReducers<AppState>({
  user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

function configureStore(): Store<AppState, Action<AppActionTypes>> {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer, undefined, middleWareEnhancer);
  return store;
}

export default configureStore();
