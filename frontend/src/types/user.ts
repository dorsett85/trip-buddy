/* eslint-disable camelcase */
export const userRole = ['admin', 'customer'] as const;

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  email_validated: boolean;
  role: typeof userRole[number];
  created_date: string;
}