import { TripRecord } from '../trip';
import { UserRecord } from '../user';
import { TripInviteRecord } from '../tripInvite';
import { InputArgs } from './inputArgs';
export interface CreateTripInvites {
    invitee_id?: UserRecord['id'];
    invitee_email: UserRecord['email'];
    trip_Id: TripRecord['id'];
}
export declare type CreateTripInvitesArgs = CreateTripInvites[];
export declare type CreateTripInvitesInputArgs = InputArgs<CreateTripInvitesArgs>;
export declare type UpdateTripInviteArgs = Pick<TripInviteRecord, 'id' | 'status'>;
export declare type UpdateTripInvitesInputArgs = InputArgs<UpdateTripInviteArgs>;
//# sourceMappingURL=tripInvite.d.ts.map