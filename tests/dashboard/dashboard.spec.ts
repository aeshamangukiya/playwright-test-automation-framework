import { test } from '@playwright/test';
import { DashboardPage } from '../../src/pages/dashboard/DashboardPage';

test('Verify Assign Leave option is visible on Dashboard', async ({ page }) => {
  await page.goto('/web/index.php/dashboard/index'); // or your dashboard URL

  const dashboard = new DashboardPage(page);
  await dashboard.verifyAssignLeaveVisible();
});
