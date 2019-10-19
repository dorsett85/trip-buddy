// State
export interface UserState {
  isLoggedIn: boolean;
  id: number | null;
  username: string;
}

// Actions
export enum Action {
  SET_LOGGED_IN = 'SET_LOGGED_IN',
  SET_USER = 'SET_USER'
}

// Action creators
export interface SetLoggedInAction {
  type: Action.SET_LOGGED_IN;
  payload: boolean;
}

export interface SetUserAction {
  type: Action.SET_USER;
  payload: UserState;
}
