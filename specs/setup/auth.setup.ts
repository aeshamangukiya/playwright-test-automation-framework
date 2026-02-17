import { test } from '../../lib/fixtures';
import { USER_ROLES } from '../../lib/data/constants/roles';
import { DashboardPage } from '../../lib/pages/dashboard/DashboardPage';
import { Logger } from '../../lib/utils/Logger';
import { APP_CONSTANTS } from '../../lib/data/constants/app-constants';

/**
 * Auth Setup
 * -----------
 * Purpose:
 * - Login once using existing login logic
 * - Persist authenticated session
 */
test('authenticate user', async ({ loginAs, page }, testInfo) => {
    Logger.info(`▶ Base URL: ${testInfo.project.use.baseURL}`);

    // Login using shared fixture
    await loginAs(USER_ROLES.USER);

    // Safety check to ensure login succeeded
    const dashboard = new DashboardPage(page);
    await dashboard.verifyDashboardLoaded();

    // Save authenticated browser state
    await page.context().storageState({
        path: APP_CONSTANTS.STORAGE_PATH,
    });
});
