import { GeneralActionType, SetFlyTo, ResetGeneralState, SetDrawer } from './types';

export const resetGeneralState: ResetGeneralState = () => ({
  type: GeneralActionType.RESET_STATE
});

export const setDrawer: SetDrawer = payload => ({
  type: GeneralActionType.SET_DRAWER,
  payload
});

export const setFlyTo: SetFlyTo = payload => ({
  type: GeneralActionType.SET_FLY_TO,
  payload
});
