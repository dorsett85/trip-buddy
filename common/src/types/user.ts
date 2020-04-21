/* eslint-disable camelcase */
export const userRole = ['admin', 'customer'] as const; 

export const acceptingTripInvites = ['no', 'friends', 'all'] as const;

export interface NewUserSetup {
  email_verified: boolean;
  username: boolean;
  accepting_trip_invites: boolean;
}

export interface UserRecord {
  id: number;
  username: string;
  email: string;
  password: string;
  email_verified: boolean;
  email_verification_token: string;
  role: typeof userRole[number];
  accepting_trip_invites: typeof acceptingTripInvites[number];
  created_date: Date;
  new_user_setup: NewUserSetup;
}

export type PartialUserRecord = Partial<UserRecord>;
