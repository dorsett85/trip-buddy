import { CaseReducer, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';
import { User } from "../../api/apollo/graphql";

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
   * If the websocket subscription has connected after login
   */
  subscriptionConnected: boolean;
  /**
   * If the user has completed their initial setup
   */
  setupComplete: boolean;
  /**
   * Record of the logged in user
   */
  data: User | undefined;
}

// Reducer
type UserCaseReducer<TPayload = void> = CaseReducer<UserState, PayloadAction<TPayload>>;

export interface UserSliceCaseReducers extends SliceCaseReducers<UserState> {
  resetUserState: UserCaseReducer;
  setLoadingUser: UserCaseReducer<UserState['loading']>;
  setLoggedIn: UserCaseReducer<UserState['loggedIn']>;
  setSubscriptionConnected: UserCaseReducer<UserState['subscriptionConnected']>;
  setSetupCompleted: UserCaseReducer<UserState['setupComplete']>;
  setUser: UserCaseReducer<Partial<User>>;
}
