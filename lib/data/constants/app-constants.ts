/**
 * Application Constants
 * Contains: Test prefixes, metadata, static configuration
 */
export const APP_CONSTANTS = {
    TEST_PREFIX: 'PW',
    STORAGE_PATH: 'storage/user.auth.json',
    TIMEOUTS: {
        DEFAULT: 10_000,
        NAVIGATION: 15_000,
        LONG: 30_000,
    },
    ROLE_PERMISSIONS: {
        admin: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
        user: ['READ'],
        support: ['READ', 'UPDATE'],
    },
} as const;
