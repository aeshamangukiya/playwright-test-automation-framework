/**
 * Browser & Device Configuration
 * ------------------------------
 * Centralized timeouts and viewport presets consumed by `playwright.config.ts`
 * and any other place that needs to align with framework-wide defaults.
 */
export const BROWSER_CONFIG = {
    VIEWPORT: {
        DESKTOP: { width: 1440, height: 900 },
        MOBILE: { width: 375, height: 812 },
    },
    TIMEOUTS: {
        ACTION: 15_000,
        EXPECT: 10_000,
        NAVIGATION: 30_000,
        TEST: 60_000,
    },
} as const;
