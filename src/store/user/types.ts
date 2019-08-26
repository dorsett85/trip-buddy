// State
export interface UserState {
  id: number | undefined;
  username: string;
}

// Actions
export enum Action {
  SET_USER = 'SET_USER'
}

// Action creators
interface SetUserAction {
  type: Action.SET_USER;
  payload: UserState;
}

export type UserActionTypes = SetUserAction;
