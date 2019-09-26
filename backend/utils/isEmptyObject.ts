/**
 * Checks if an object is empty
 * @param   {object} obj
 * @returns boolean
 */
export const isEmptyObject = (obj: object) => {
  return !(Object.entries(obj).length && obj.constructor === Object);
};
