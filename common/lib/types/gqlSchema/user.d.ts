import { UserRecord, PartialUserRecord } from '../user';
import { InputArgs } from './inputArgs';
export declare type CreateUserArgs = Pick<UserRecord, 'username' | 'password' | 'email'>;
export declare type CreateUserInputArgs = InputArgs<CreateUserArgs>;
export declare type UpdateUserArgs = Omit<PartialUserRecord, 'id' | 'email_verification_token' | 'created_date'>;
export declare type UpdateUserInputArgs = InputArgs<UpdateUserArgs>;
//# sourceMappingURL=user.d.ts.map