import { shallowEqual } from 'react-redux';
import { useAppSelector } from './useAppSelector';

/**
 * Same as useAppSelector, but will do a shallow comparison instead of a
 * strict comparison.
 * @see https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
 */
export const useAppShallowEqualSelector: typeof useAppSelector = selector => {
  return useAppSelector(selector, shallowEqual);
}
