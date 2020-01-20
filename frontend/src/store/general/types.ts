import { Reducer, ActionCreator, Action } from 'redux';
import { GenericAction, GenericActionCreator } from '../utils.types';
import { LngLatArray } from '../../types/shared';

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
export type GeneralReducer = Reducer<GeneralState, GeneralAction>;

// Action types
export enum GeneralActionType {
  RESET_STATE = 'RESET_STATE',
  SET_DRAWER = 'SET_DRAWER',
  SET_FLY_TO = 'SET_FLY_TO'
}

// Actions
export type ResetGeneralStateAction = Action<GeneralActionType.RESET_STATE>;
export type SetDrawerAction = GenericAction<
  GeneralActionType.SET_DRAWER,
  Partial<GeneralState['drawer']>
>;
export type SetFlyToAction = GenericAction<
  GeneralActionType.SET_FLY_TO,
  GeneralState['flyTo']
>;
export type GeneralAction = ResetGeneralStateAction | SetDrawerAction | SetFlyToAction;

// Action creators
export type ResetGeneralState = ActionCreator<ResetGeneralStateAction>;
export type SetDrawer = GenericActionCreator<SetDrawerAction>;
export type SetFlyTo = GenericActionCreator<SetFlyToAction>;
