/* eslint-disable camelcase */
export interface TripRecord {
  id: number;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  created_date: Date;
}
