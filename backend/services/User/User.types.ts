export interface UserBasic {
  username?: string;
  password: string;
  email?: string
}

export type LoginArgs = UserBasic;
export type RegisterArgs = UserBasic;