/* eslint-disable camelcase */
export const userRole = ['admin', 'customer'] as const; 

export const acceptingTripInvites = ['no', 'friends', 'all'] as const;

export interface UserRecord {
  id: number;
  username: string;
  email: string;
  password: string;
  email_validated: boolean;
  role: typeof userRole[number];
  accepting_trip_invites: typeof acceptingTripInvites[number];
  created_date: Date;
}
