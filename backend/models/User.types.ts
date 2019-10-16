export interface UserRecord {
  id: number;
  username: string;
  email: string;
  password: string;
  // eslint-disable-next-line camelcase
  email_validated: boolean;
  created: Date;
}
