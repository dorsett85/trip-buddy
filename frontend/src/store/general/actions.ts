import { SetOpenDrawer, GeneralActionType, SetFlyTo } from './types';

export const setOpenDrawer: SetOpenDrawer = payload => ({
  type: GeneralActionType.SET_OPEN_DRAWER,
  payload
});

export const setFlyTo: SetFlyTo = payload => ({
  type: GeneralActionType.SET_FLY_TO,
  payload
});
