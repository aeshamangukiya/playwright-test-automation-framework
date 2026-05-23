import { defineConfig, devices } from '@playwright/test';
import { ENV } from './config/env';
import { BROWSER_CONFIG } from './config/browser';
import { APP_CONSTANTS } from './lib/data/constants/app-constants';

const isCI = ENV.IS_CI;

export default defineConfig({
    testDir: './specs',
    timeout: BROWSER_CONFIG.TIMEOUTS.TEST,
    expect: { timeout: BROWSER_CONFIG.TIMEOUTS.EXPECT },
    fullyParallel: true,

    forbidOnly: isCI,
    retries: isCI ? 1 : 0,
    workers: isCI ? 3 : undefined,

    outputDir: 'test-results',

    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: isCI ? 'never' : 'on-failure' }],
        ['allure-playwright', { outputFolder: 'allure-results', detail: true, suiteTitle: true }],
        ['junit', { outputFile: 'test-results/results.xml' }],
        ['json', { outputFile: 'test-results/results.json' }],
    ],

    use: {
        ...devices['Desktop Chrome'],
        baseURL: ENV.BASE_URL,
        headless: isCI,
        viewport: BROWSER_CONFIG.VIEWPORT.DESKTOP,
        actionTimeout: BROWSER_CONFIG.TIMEOUTS.ACTION,
        navigationTimeout: BROWSER_CONFIG.TIMEOUTS.NAVIGATION,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },

    projects: [
        // 1) Authentication setup — runs once, captures storage state.
        {
            name: 'setup-auth',
            testMatch: /.*\.setup\.ts/,
            use: { ...devices['Desktop Chrome'] },
        },

        // 2) Standard authenticated specs — reuse storage state.
        {
            name: 'authenticated',
            dependencies: ['setup-auth'],
            testIgnore: [/.*\.setup\.ts/, /.*login\.spec\.ts/],
            use: {
                ...devices['Desktop Chrome'],
                storageState: APP_CONSTANTS.STORAGE_PATH,
            },
        },

        // 3) Login specs — fresh session, no persisted storage.
        {
            name: 'unauthenticated',
            testMatch: /.*login\.spec\.ts/,
            use: {
                ...devices['Desktop Chrome'],
                storageState: undefined,
            },
        },
    ],
});
