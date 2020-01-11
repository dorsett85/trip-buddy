import { Reducer, ActionCreator, Action } from 'redux';
import { GenericAction, GenericActionCreator } from '../../types/store';
import { LngLatArray } from '../../types/shared';

// State
export interface GeneralState {
  openDrawer: boolean;
  flyTo?: LngLatArray;
}

// Reducer
export type GeneralReducer = Reducer<GeneralState, GeneralAction>;

// Action types
export enum GeneralActionType {
  RESET_STATE = 'RESET_STATE',
  SET_OPEN_DRAWER = 'SET_OPEN_DRAWER',
  SET_FLY_TO = 'SET_FLY_TO'
}

// Actions
export type ResetStateAction = Action<GeneralActionType.RESET_STATE>;
export type SetOpenDrawerAction = GenericAction<
  GeneralActionType.SET_OPEN_DRAWER,
  GeneralState['openDrawer']
>;
export type SetFlyToAction = GenericAction<
  GeneralActionType.SET_FLY_TO,
  GeneralState['flyTo']
>;
export type GeneralAction = ResetStateAction | SetOpenDrawerAction | SetFlyToAction;

// Action creators
export type ResetGeneralState = ActionCreator<ResetStateAction>;
export type SetOpenDrawer = GenericActionCreator<SetOpenDrawerAction>;
export type SetFlyTo = GenericActionCreator<SetFlyToAction>;
