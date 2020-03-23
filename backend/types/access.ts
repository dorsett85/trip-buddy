import { UserRecord } from 'common/lib/types/user';

/**
 * Arguments required when a user logs in
 */
export interface LoginArgs {
  username: UserRecord['username'];
  password: UserRecord['password'];
}

/**
 * Arguments required when a user logs register
 */
export interface RegisterArgs {
  email: UserRecord['email'];
  password: UserRecord['password'];
}
