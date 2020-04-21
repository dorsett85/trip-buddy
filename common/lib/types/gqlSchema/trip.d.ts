import { OmitCreatedDate } from '../utils';
import { TripRecord, PartialTripRecord } from '../trip';
import { InputArgs } from './inputArgs';
export declare type CreateTripArgs = Pick<TripRecord, 'name' | 'description' | 'location' | 'start_date'>;
export declare type CreateTripInputArgs = InputArgs<CreateTripArgs>;
export declare type UpdateTripArgs = OmitCreatedDate<PartialTripRecord & {
    id: TripRecord['id'];
}>;
export declare type UpdateTripInputArgs = InputArgs<UpdateTripArgs>;
//# sourceMappingURL=trip.d.ts.map