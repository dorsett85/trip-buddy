export declare const userRole: readonly ["admin", "customer"];
export declare const acceptingTripInvites: readonly ["no", "friends", "all"];
export interface UserRecord {
    id: number;
    username: string;
    email: string;
    password: string;
    email_verified: boolean;
    role: typeof userRole[number];
    accepting_trip_invites: typeof acceptingTripInvites[number];
    created_date: Date;
}
//# sourceMappingURL=user.d.ts.map