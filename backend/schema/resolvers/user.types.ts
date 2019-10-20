export interface UserSchema {
  id?: number;
  username?: String;
  email?: String;
  // eslint-disable-next-line camelcase
  email_validated?: boolean;
  created?: Date;
}

export interface LoginArgs {
  username: string;
  password: string;
}

export interface RegisterArgs {
  email: string;
  password: string;
}
