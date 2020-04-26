export declare const tripInviteStatus: readonly ["initiated", "notified", "accepted", "declined"];
export interface TripInviteRecord {
    id: number;
    trip_id: number;
    inviter_id: number;
    invitee_id?: number;
    invitee_email: string;
    status: typeof tripInviteStatus[number];
    created_date: string;
}
export declare type PartialTripInviteRecord = Partial<TripInviteRecord>;
//# sourceMappingURL=tripInvite.d.ts.map