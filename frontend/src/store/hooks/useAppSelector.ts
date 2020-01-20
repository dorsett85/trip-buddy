import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppState } from '../types';

/**
 * Types the useSelector hook to match the app state.  This makes it so
 * we don't need to type AppState every time we use it.
 */
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
