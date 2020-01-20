import { createStore, combineReducers, Store } from 'redux';
import { userReducer } from './user/reducer';
import { tripReducer } from './trip/reducer';
import { AppState, AppAction, AppReducers } from './types';
import { generalReducer } from './general/reducer';

// const appReducers: AppReducers = {
//   general: generalReducer,
//   user: userReducer,
//   trip: tripReducer
// };

const rootReducer = combineReducers<AppState>({
  general: generalReducer,
  user: userReducer,
  trip: tripReducer
});

export type AppState = ReturnType<typeof rootReducer>;

function configureStore(): Store<AppState, AppAction> {
  const store = createStore(rootReducer);
  return store;
}

export default configureStore();
