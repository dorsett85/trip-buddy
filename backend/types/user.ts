/* eslint-disable camelcase */
import { UserRecord } from 'common/lib/types/user';

export type PartialUserRecord = Partial<UserRecord>;

export type CreateUserArgs = Pick<UserRecord, 'username' | 'password' | 'email'>;

export type UpdateUserArgs = Omit<
  PartialUserRecord,
  'id' | 'email_verification_token' | 'created_date'
>;
