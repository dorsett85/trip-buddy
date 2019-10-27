import { KeyValue } from '../types';

/**
 * Shallow merge objects
 *
 * Given an array of objects, create one object that shallow merges the properties
 * from each object.  If there is a merge conflict between two objects with the
 * same property, then spread those sub properties into the same shared property.
 * 
 * If there are conflicts within nested properties then the old property will be
 * overridden.
 */
export const shallowMerge = (arrOfObjects: KeyValue[]): KeyValue => {
  const resolverAccumulator: KeyValue = {};
  return arrOfObjects.reduce((acc, obj) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(obj)) {
      // Add property if it doesn't exist, otherwise combine new properties
      acc[key] = !acc[key] ? obj[key] : { ...acc[key], ...obj[key] };
    }
    return acc;
  }, resolverAccumulator);
};
