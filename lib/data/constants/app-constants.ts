/**
 * Application Constants
 * ---------------------
 * Static, environment-agnostic values shared across the framework.
 *
 * Anything that varies by environment belongs in `config/env.ts`.
 * Anything user-facing belongs in `messages.ts` or `ui-constants.ts`.
 */
export const APP_CONSTANTS = {
    /** Prefix used by `DataGenerator` to mark auto-generated test data. */
    TEST_PREFIX: 'PW',

    /** Persisted authenticated session — written by the `setup-auth` project. */
    STORAGE_PATH: 'storage/auth/user.json',

    TIMEOUTS: {
        DEFAULT: 10_000,
        NAVIGATION: 15_000,
        LONG: 30_000,
    },

    /** Example permission matrix for future RBAC assertions. */
    ROLE_PERMISSIONS: {
        admin: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
        user: ['READ'],
    },
} as const;
