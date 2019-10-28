import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { userReducer } from './user/reducer';
import { AppState } from './types';

const rootReducer = combineReducers<AppState>({
  user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

function configureStore(): Store<AppState> {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer, undefined, middleWareEnhancer);
  return store;
}

export default configureStore();
