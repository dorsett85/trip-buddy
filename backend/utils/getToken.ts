/**
 * Get token
 *
 * Given an Authorization header string of "<type> <credentials>", return
 * only the credentials
 */
export const getToken = (authorization: string | undefined, type = 'Bearer') => {
  if (!authorization || !authorization.startsWith(type)) {
    return null;
  }
  return authorization.slice(type.length + 1, authorization.length);
};
