import { SetOpenDrawer, GeneralActionType, SetFlyTo, ResetGeneralState } from './types';

export const resetGeneralState: ResetGeneralState = () => ({
  type: GeneralActionType.RESET_STATE
});


export const setOpenDrawer: SetOpenDrawer = payload => ({
  type: GeneralActionType.SET_OPEN_DRAWER,
  payload
});

export const setFlyTo: SetFlyTo = payload => ({
  type: GeneralActionType.SET_FLY_TO,
  payload
});
