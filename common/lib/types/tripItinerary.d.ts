import { LngLatArray } from "./utils";
export interface TripItineraryRecord {
    id: number;
    trip_id: number;
    name: string;
    description?: string;
    location: LngLatArray;
    location_address: string;
    start_time: string;
    end_time?: string;
    created_date: string;
}
export declare type PartialTripItineraryRecord = Partial<TripItineraryRecord>;
//# sourceMappingURL=tripItinerary.d.ts.map