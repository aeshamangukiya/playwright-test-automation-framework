import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/auth/LoginPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';

/**
 * Base Fixture
 * ------------
 * Provides ready-to-use Page Object instances for every test.
 *
 * Every test importing `test` from `lib/fixtures` automatically gets:
 *   - `loginPage`      — `LoginPage` bound to the current `page`
 *   - `dashboardPage`  — `DashboardPage` bound to the current `page`
 *
 * Keep this fixture free of authentication or business logic; that belongs
 * in `auth.fixture.ts` and `lib/helpers/*` respectively.
 */
type BaseFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
};

export const test = base.extend<BaseFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
});

export { expect };
