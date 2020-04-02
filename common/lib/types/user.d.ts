export declare const userRole: readonly ["admin", "customer"];
export declare const acceptingTripInvites: readonly ["no", "friends", "all"];
export interface NewUserSetup {
    email_verified: boolean;
    username: boolean;
    accepting_trip_invites: boolean;
}
export interface UserRecord {
    id: number;
    username: string;
    email: string;
    password: string;
    email_verified: boolean;
    role: typeof userRole[number];
    accepting_trip_invites: typeof acceptingTripInvites[number];
    created_date: Date;
    new_user_setup: NewUserSetup;
}
//# sourceMappingURL=user.d.ts.map