import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { URLS } from '../../../config/urls';
import { Wait } from '../../utils/Wait';
import { Logger } from '../../utils/Logger';
import { AssertionHelper } from '../../helpers/AssertionHelper';
import { MESSAGES } from '../../data/constants/messages';
import { UI_CONSTANTS } from '../../data/constants/ui-constants';

export class DashboardPage extends BasePage {
    private readonly assignLeaveOption: Locator;

    constructor(page: Page) {
        super(page);
        this.assignLeaveOption = page.getByText(/Assign Leave/i);
    }

    /* ---------------------------
       Assertions
    ---------------------------- */

    async verifyDashboardLoaded() {
        await AssertionHelper.urlContains(this.page, URLS.DASHBOARD);
        Logger.success(MESSAGES.DASHBOARD_LOADED);
        await Wait.pause(this.page, 1000); // Small stability pause
    }

    /**
     * Verifies that Assign Leave option is visible on Dashboard
     */
    async verifyAssignLeaveVisible(): Promise<void> {
        await this.expectVisible(
            this.assignLeaveOption,
            'Assign Leave option should be visible on Dashboard'
        );
    }
}
