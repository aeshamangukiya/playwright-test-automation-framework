import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string, timeout = 15000) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout });
  }

  async click(locator: Locator, timeout = 10000) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click({ timeout });
  }

  /* ============================
     🔐 STABLE ENTERPRISE INPUT
  ============================ */
  async stableFill(locator: Locator, value: string) {
    await locator.waitFor({ state: 'visible' });

    // Clear using real keyboard (safe)
    await locator.click();
    await locator.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
    await locator.press('Backspace');

    // Type sequentially (non-deprecated)
    await locator.pressSequentially(value, { delay: 80 });

    // Hard assertion — prevents silent failures
    await expect(locator).toHaveValue(value, { timeout: 5000 });
  }

  async expectVisible(locator: Locator, message?: string) {
    await expect(locator, message).toBeVisible();
  }
}
