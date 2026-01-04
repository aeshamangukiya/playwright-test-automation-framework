import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { URLS } from '../../config/urls';
import { Wait } from '../../utils/Wait';
import { Logger } from '../../utils/Logger';
import { Assertions } from '../../utils/Assertions';

export class DashboardPage extends BasePage {

    private readonly assignLeaveOption: Locator;

  /**
   * Expected dashboard URL after successful login
   * Using `includes` instead of exact match for safety
   */

  constructor(page: Page) {
    super(page);
    
  this.assignLeaveOption = page.getByText('Assign Leave', { exact: true });
  }

 /* ---------------------------
     Assertions
  ---------------------------- */

  async verifyDashboardLoaded() {
    await Assertions.urlContains(this.page, URLS.DASHBOARD);
    Logger.success('Login successful');
    await Wait.pause(this.page, 10_000);
  }

  /**
   * Verifies that Assign Leave option is visible on Dashboard
   */
  async verifyAssignLeaveVisible(): Promise<void> {
    await expect(
      this.assignLeaveOption,
      'Assign Leave option should be visible on Dashboard'
    ).toBeVisible();
  }

}
