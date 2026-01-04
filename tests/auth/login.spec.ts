import { test } from '../../src/fixtures/auth.fixture';
import { UserRole } from '../../src/constants/roles';
import { DashboardPage } from '../../src/pages/dashboard/DashboardPage';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { Logger } from '../../src/utils/Logger';

const TEST_ROLE = process.env.TEST_ROLE;


/* =========================================================
   Login – Single User (Smoke + Regression)
========================================================= */
test.describe('Login – Single User', () => {

  test(
    'User can login successfully',
    { tag: ['@smoke', '@regression'] },
    async ({ loginAs, page }, testInfo) => {

      testInfo.annotations.push(
        { type: 'severity', description: 'critical' }
      );

      Logger.step('Logging in as User');
      await loginAs(UserRole.USER);

     const dashboard = new DashboardPage(page);
     await dashboard.verifyDashboardLoaded();
    }
  );
});
