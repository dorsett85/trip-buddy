import { CaseReducer, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { LngLatArray } from 'common/lib/types/utils';

// State
export interface DrawerType {
  open: boolean;
  content: 'trip' | 'user' | undefined;
}

export interface GeneralState {
  /**
   * Open/close and set the content of the side drawer
   */
  drawer: DrawerType;
  /**
   * location for the map to fly to
   */
  flyTo: LngLatArray | undefined;
}

// Reducer
type GeneralCaseReducer<TPayload = void> = CaseReducer<
  GeneralState,
  PayloadAction<TPayload>
>;

export interface GeneralSliceCaseReducers extends SliceCaseReducers<GeneralState> {
  resetGeneralState: GeneralCaseReducer;
  setDrawer: GeneralCaseReducer<Partial<GeneralState['drawer']>>;
  setFlyTo: GeneralCaseReducer<GeneralState['flyTo']>;
}
