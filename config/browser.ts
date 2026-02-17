/**
 * Browser & Device Configuration
 * Centralized viewport and device settings
 */
export const BROWSER_CONFIG = {
    VIEWPORT: {
        DESKTOP: { width: 1440, height: 900 },
        MOBILE: { width: 375, height: 812 },
    },
    TIMEOUTS: {
        ACTION: 10_000,
        NAVIGATION: 15_000,
        TEST: 30_000,
    }
} as const;
