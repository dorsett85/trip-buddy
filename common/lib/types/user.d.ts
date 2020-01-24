export declare const userRole: readonly ["admin", "customer"];
export interface UserRecord {
    id: number;
    username: string;
    email: string;
    password: string;
    email_validated: boolean;
    role: typeof userRole[number];
    created_date: Date;
}
//# sourceMappingURL=user.d.ts.map