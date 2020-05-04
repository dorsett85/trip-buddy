import { UserRecord } from '../models/UserModel.types';

/**
 * Determine if we need to use the current user's id not.
 *
 * When operating on our database, we'll often need to join another table to
 * get a user id to filter on. This is either because the user does not have
 * admin privileges or we've been told not to join another table (from the
 * joinUser argument).
 *
 * If joinUser is false it means that we can safely bypass the admin check and
 * query a table directly (since this function will then return undefined). This
 * is useful when the method that called this function was called from inside of
 * a nested resolver and the user has already been identified.
 */
export const determineUserId = (
  user: UserRecord,
  joinUser?: boolean
): UserRecord['id'] | undefined => {
  const isAdmin = user.role === 'admin';
  if (joinUser === undefined) {
    return isAdmin ? undefined : user.id;
  }
  return !joinUser || isAdmin ? undefined : user.id;
};
