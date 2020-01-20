import { useDispatch } from 'react-redux';
import store from '..';

/**
 * Convenience function for making sure the redux dispatch function only
 * allows actions defined in store.dispatch
 */
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
