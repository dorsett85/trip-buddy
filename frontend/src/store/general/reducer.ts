import { GeneralState, GeneralReducer } from './types';

const initialState: GeneralState = {
  openDrawer: false,
  flyTo: undefined
};

export const generalReducer: GeneralReducer = (state = initialState, action): GeneralState => {
  if (action.type === 'SET_OPEN_DRAWER') {
    return { ...state, openDrawer: action.payload };
  }

  if (action.type === 'SET_FLY_TO') {
    return { ...state, flyTo: action.payload };
  }

  return state;
};
