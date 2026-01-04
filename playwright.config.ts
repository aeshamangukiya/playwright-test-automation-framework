import { defineConfig } from '@playwright/test';
import { ENV } from './src/config/env';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 0,

  reporter: [
    ['list'],
    [
      'html',
      {
        open: !process.env.CI ? 'always' : 'never', // open HTML report only on local runs
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
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    // PREPARE-AUTH PROJECT (LOGIN ONCE)
    {
      name: 'prepare-auth',
      testMatch: /.*\.setup\.ts/,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        baseURL: ENV.BASE_URL,
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
      testIgnore: /.*login\.spec\.ts/, // IMPORTANT LINE
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        baseURL: ENV.BASE_URL,
        storageState: 'storage/user.auth.json',
        
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
    dependencies: ['prepare-auth'],
    testMatch: /.*login\.spec\.ts/,
    use: {
      browserName: 'chromium',
      channel: 'chrome',
      baseURL: ENV.BASE_URL,
      storageState: undefined, // KEY LINE
    },
  },
  ],
});

