export interface UserSchema {
  id: number;
  username: string;
  password?: string;
  email: string;
  // eslint-disable-next-line camelcase
  email_validated: boolean;
  created: number;
}
