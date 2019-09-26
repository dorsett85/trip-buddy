export interface UserFields {
  id: number;
  username: String;
  email: String;
  password: String;
  // eslint-disable-next-line camelcase
  email_validated: Boolean;
  created: Date;
}