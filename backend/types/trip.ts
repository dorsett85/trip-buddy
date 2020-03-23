import { TripRecord } from 'common/lib/types/trip';
import { InputResolverArg, OmitCreatedDate, OmitId } from '.';

export type PartialTripRecord = Partial<TripRecord>;

export type CreateTripArgs = Pick<
  TripRecord,
  'name' | 'description' | 'location' | 'start_date'
>;
export type CreateTripInput = InputResolverArg<CreateTripArgs>;

export type FindTripInput = InputResolverArg<PartialTripRecord>;

export type UpdateTripArgs = OmitCreatedDate<
  PartialTripRecord & { id: TripRecord['id'] }
>;
export type UpdateTripOmitIdArgs = OmitId<UpdateTripArgs>;
export type UpdateTripInput = InputResolverArg<UpdateTripArgs>;
