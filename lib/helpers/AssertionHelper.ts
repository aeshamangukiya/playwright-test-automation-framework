import { expect, Page } from '@playwright/test';

/* -------------------------------------------------------
 * Assertion Helper
 * -------------------------------------------------------
 * Purpose:
 * - Reusable business assertions
 * - Extends Playwright assertions
 * -------------------------------------------------------
 */

export class AssertionHelper {
    static async urlContains(page: Page, text: string) {
        await expect(page).toHaveURL(new RegExp(text));
    }
}
