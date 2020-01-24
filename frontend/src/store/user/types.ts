import { CaseReducer, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';
import { UserRecord } from 'common/lib/types/user';

// State
export interface UserState {
  /**
   * If the user data is being requested
   */
  loading: boolean;
  /**
   * If the user is logged in (i.e., the local jwt token is saved
   * in local storage)
   */
  loggedIn: boolean;
  /**
   * Record of the logged in user
   */
  data: UserRecord | undefined;
}

// Reducer
type UserCaseReducer<TPayload = void> = CaseReducer<UserState, PayloadAction<TPayload>>;

export interface UserSliceCaseReducers extends SliceCaseReducers<UserState> {
  resetUserState: UserCaseReducer;
  setLoadingUser: UserCaseReducer<UserState['loading']>;
  setLoggedIn: UserCaseReducer<UserState['loggedIn']>;
  setUser: UserCaseReducer<Partial<UserRecord>>;
}
