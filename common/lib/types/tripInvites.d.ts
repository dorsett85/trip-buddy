export declare const tripInviteStatus: string[];
export interface TripInvites {
    id: number;
    trip_id: number;
    inviter_id: number;
    invitee_id?: number;
    invitee_email: string;
    status: typeof tripInviteStatus[number];
    created_date: Date;
}
//# sourceMappingURL=tripInvites.d.ts.map