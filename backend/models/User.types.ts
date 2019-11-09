/* eslint-disable camelcase */
export interface UserRecord {
  id: number;
  username: string;
  email: string;
  password: string;
  email_validated: boolean;
  created_date: Date;
}
