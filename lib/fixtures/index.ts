import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/auth/LoginPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { USERS } from '../data/users';
import { USER_ROLES, UserRole } from '../data/constants/roles';
import { Logger } from '../utils/Logger';

/* -------------------------------------------------------
 * Fixture Types
 * -------------------------------------------------------
 */
type AppFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;

    // Role-based Pages (Auto-Login)
    userPage: DashboardPage;
    adminPage: DashboardPage;

    // Actions
    loginAs: (role: UserRole) => Promise<void>;
};

/* -------------------------------------------------------
 * Test Extension
 * -------------------------------------------------------
 */
export const test = base.extend<AppFixtures>({

    // Basic Pages
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },

    // Actions
    loginAs: async ({ page }, use) => {
        await use(async (role: UserRole) => {
            const loginPage = new LoginPage(page);
            const user = USERS[role];
            Logger.step(`Logging in as ${role}`);
            await loginPage.openLoginPage();
            await loginPage.login(user.username, user.password);
        });
    },

    /* ---------------------------
       Role Auto-Detection / Specific Pages
    ---------------------------- */

    userPage: async ({ page, loginAs }, use) => {
        await loginAs(USER_ROLES.USER);
        await use(new DashboardPage(page));
    },

    adminPage: async ({ page, loginAs }, use) => {
        await loginAs(USER_ROLES.ADMIN);
        await use(new DashboardPage(page));
    },
});

export { expect } from '@playwright/test';
