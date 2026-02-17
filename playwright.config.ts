import { defineConfig } from '@playwright/test';
import { ENV } from './config/env';
import { BROWSER_CONFIG } from './config/browser';
import { APP_CONSTANTS } from './lib/data/constants/app-constants';

export default defineConfig({
  testDir: './specs',
  timeout: BROWSER_CONFIG.TIMEOUTS.TEST,
  retries: 0,

  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'never',
      },
    ],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: true,
        // open: false, // optional, prevents Allure from opening automatically
      },
    ],
  ],

  use: {
    headless: process.env.CI === 'true',
    actionTimeout: BROWSER_CONFIG.TIMEOUTS.ACTION,
    navigationTimeout: BROWSER_CONFIG.TIMEOUTS.NAVIGATION,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    baseURL: ENV.BASE_URL,
  },

  projects: [
    // PREPARE-AUTH PROJECT (LOGIN ONCE)
    {
      name: 'prepare-auth',
      testMatch: /.*\.setup\.ts/,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        launchOptions:
          process.env.CI === 'true'
            ? {
              args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }
            : {},
      },
    },

    // AFTER-LOGIN PROJECT (REUSE LOGIN)
    {
      name: 'after-login',
      dependencies: ['prepare-auth'],
      testIgnore: /.*login\.spec\.ts/, // Exclude login tests
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        storageState: APP_CONSTANTS.STORAGE_PATH,

        launchOptions:
          process.env.CI === 'true'
            ? {
              args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }
            : {},
      },
    },

    // BEFORE-LOGIN PROJECT (LOGIN TESTS)
    {
      name: 'before-login',
      dependencies: ['prepare-auth'], // Optional dependency if independent
      testMatch: /.*login\.spec\.ts/,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        storageState: undefined, // Ensure fresh session
      },
    },
  ],
});

