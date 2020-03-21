export declare const tripInviteStatus: string[];
export interface TripInviteRecord {
    id: number;
    trip_id: number;
    inviter_id: number;
    invitee_id?: number;
    invitee_email: string;
    status: typeof tripInviteStatus[number];
    created_date: Date;
}
//# sourceMappingURL=tripInvite.d.ts.map