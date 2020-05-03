export interface KeyValue<T = any> {
    [key: string]: T;
}
/**
 * Change the return type of function types
 */
export declare type ChangeReturnType<TFunction, TReturn> = TFunction extends (...a: infer A) => any ? (...a: A) => TReturn : never;
/**
 * Remove the id property from a type. Used for update argument objects where
 * we never want to update the id column, so we make sure id prop is omitted.
 */
export declare type OmitId<T> = Omit<T, 'id'>;
/**
 * Remove the created_date property from a type. Used for update argument objects
 * where we never want to update the created_date column, so we make sure created_date
 * prop is omitted.
 */
export declare type OmitCreatedDate<T> = Omit<T, 'created_date'>;
/**
 * Omit both id and created_date properties
 */
export declare type OmitIdCreatedDate<T> = OmitId<T> & OmitCreatedDate<T>;
/**
 * Helper function to add an optional userId property. This is helpful for
 * service methods that check for a userId before passing arguments to the
 * model layer.
 */
export declare type WithOptionalUserId<T extends object> = T & {
    userId?: number;
};
/**
 * Data type for longitude/latitude points
 */
export declare type LngLatArray = [number, number];
//# sourceMappingURL=utils.d.ts.map