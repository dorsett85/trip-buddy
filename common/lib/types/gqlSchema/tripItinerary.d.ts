import { TripItineraryRecord, PartialTripItineraryRecord } from '../tripItinerary';
import { TripRecord } from '../trip';
import { LngLatArray, OmitCreatedDate } from '../utils';
import { InputArgs } from './inputArgs';
export declare type CreateTripItineraryArgs = {
    trip_id: TripRecord['id'];
    name: TripItineraryRecord['name'];
    description?: TripItineraryRecord['description'];
    location: LngLatArray;
    location_address: TripItineraryRecord['location_address'];
    start_time: TripItineraryRecord['start_time'];
};
export declare type CreateTripItineraryInputArgs = InputArgs<CreateTripItineraryArgs>;
export declare type UpdateTripItineraryArgs = OmitCreatedDate<PartialTripItineraryRecord & {
    id: TripItineraryRecord['id'];
}>;
export declare type UpdateTripItineraryInputArgs = InputArgs<UpdateTripItineraryArgs>;
//# sourceMappingURL=tripItinerary.d.ts.map