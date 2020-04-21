/* eslint-disable camelcase */
import { UserRecord, PartialUserRecord } from '../user';
import { InputArgs } from './inputArgs';

export type CreateUserArgs = Pick<UserRecord, 'username' | 'password' | 'email'>;
export type CreateUserInputArgs = InputArgs<CreateUserArgs>;

export type UpdateUserArgs = Omit<
  PartialUserRecord,
  'id' | 'email_verification_token' | 'created_date'
>;
export type UpdateUserInputArgs = InputArgs<UpdateUserArgs>;
