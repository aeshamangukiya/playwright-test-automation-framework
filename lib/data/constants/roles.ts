/**
 * User Role Definitions
 * Enterprise Standard: Constant Objects (not enums)
 */
export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
