import { EMAIL_REGEX } from "./constants/emailRegex";

/**
 * Check if an email address is valid
 */
export const isValidEmail = (email: string) => EMAIL_REGEX.test(email);