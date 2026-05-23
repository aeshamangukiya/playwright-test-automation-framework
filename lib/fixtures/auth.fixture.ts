import { test as baseTest } from './base.fixture';
import { LoginPage } from '../pages/auth/LoginPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { USERS } from '../data/users';
import { USER_ROLES, type UserRole } from '../data/constants/roles';
import { Logger } from '../utils/Logger';

/**
 * Auth Fixture
 * ------------
 * Adds authentication-related fixtures on top of the base fixture:
 *
 *   - `loginAs(role)`  — Programmatic login action for any supported role.
 *   - `userPage`       — `DashboardPage` pre-authenticated as USER.
 *   - `adminPage`      — `DashboardPage` pre-authenticated as ADMIN.
 *
 * Specs should prefer these fixtures over manually instantiating page
 * objects, so that login flows live in exactly one place.
 */
type AuthFixtures = {
    loginAs: (role: UserRole) => Promise<void>;
    userPage: DashboardPage;
    adminPage: DashboardPage;
};

export const test = baseTest.extend<AuthFixtures>({
    loginAs: async ({ page }, use) => {
        await use(async (role: UserRole) => {
            const loginPage = new LoginPage(page);
            const user = USERS[role];
            Logger.step(`Logging in as ${role}`);
            await loginPage.openLoginPage();

            // Idempotent: if a persisted session already redirected us past the
            // login form, skip the credential flow.
            if (page.url().includes('/auth/login')) {
                await loginPage.login(user.username, user.password);
            } else {
                Logger.info(`Existing session detected — skipping login as ${role}`);
            }
        });
    },

    userPage: async ({ page, loginAs }, use) => {
        await loginAs(USER_ROLES.USER);
        await use(new DashboardPage(page));
    },

    adminPage: async ({ page, loginAs }, use) => {
        await loginAs(USER_ROLES.ADMIN);
        await use(new DashboardPage(page));
    },
});

export { expect } from './base.fixture';
