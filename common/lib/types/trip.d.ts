import { LngLatArray } from './utils';
export declare const tripStatus: readonly ["pending", "confirmed", "active", "completed", "cancelled"];
export interface TripRecord {
    id: number;
    name: string;
    description: string;
    location: LngLatArray;
    location_address: string;
    start_date: string;
    status: typeof tripStatus[number];
    created_date: string;
}
//# sourceMappingURL=trip.d.ts.map