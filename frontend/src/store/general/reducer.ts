import { GeneralState, GeneralReducer } from './types';

const initialState: GeneralState = {
  drawer: {
    open: false,
    content: undefined
  },
  flyTo: undefined
};

export const generalReducer: GeneralReducer = (state = initialState, action): GeneralState => {
  if (action.type === 'RESET_STATE') {
    return initialState;
  }

  if (action.type === 'SET_DRAWER') {
    const drawer = {
      ...state.drawer,
      ...action.payload
    };
    return { ...state, drawer };
  }

  if (action.type === 'SET_FLY_TO') {
    return { ...state, flyTo: action.payload };
  }

  return state;
};
