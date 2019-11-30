import { Reducer, ActionCreator, Action } from 'redux';
import { ActionWithPayload, GenericActionCreator } from '../../types/store';
import { LngLatArray } from '../../types/shared';

// State
export interface GeneralState {
  openDrawer: boolean;
  flyTo: LngLatArray | undefined;
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
export type SetOpenDrawerAction = ActionWithPayload<
  GeneralActionType.SET_OPEN_DRAWER,
  GeneralState['openDrawer']
>;
export type SetFlyToAction = ActionWithPayload<
  GeneralActionType.SET_FLY_TO,
  GeneralState['flyTo']
>;
export type GeneralAction = ResetStateAction | SetOpenDrawerAction | SetFlyToAction;

// Action creators
export type ResetGeneralState = ActionCreator<ResetStateAction>;
export type SetOpenDrawer = GenericActionCreator<SetOpenDrawerAction>;
export type SetFlyTo = GenericActionCreator<SetFlyToAction>;
