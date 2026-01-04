import { Page, Locator, expect, Response } from '@playwright/test';

export class Wait {
  
  /* ---------------------------
     Page / Navigation
  ---------------------------- */

  /**
   * Waits until the page has no ongoing network requests
   * Best used after navigation or login redirects
   */
  static async forNetworkIdle(page: Page, timeout = 10_000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Waits until DOM content is fully loaded
   * Faster than networkidle for SPA apps
   */
  static async forDomContentLoaded(page: Page, timeout = 10_000): Promise<void> {
    await page.waitForLoadState('domcontentloaded', { timeout });
  }

  /**
   * Waits until the page reaches full load state
   */
  static async forPageLoad(page: Page, timeout = 10_000): Promise<void> {
    await page.waitForLoadState('load', { timeout });
  }

  /**
   * Waits until the URL matches or contains expected value
   * Best for redirect verification
   */
  static async forURL(
    page: Page,
    urlPart: string | RegExp,
    timeout = 10_000
  ): Promise<void> {
    await page.waitForURL(urlPart, { timeout });
  }

  /* ---------------------------
     Locator / Element
  ---------------------------- */

  /**
   * Waits until an element becomes visible
   */
  static async forVisible(
    locator: Locator,
    timeout = 10_000
  ): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Waits until an element is hidden or removed
   */
  static async forHidden(
    locator: Locator,
    timeout = 10_000
  ): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }


  /**
   * Waits until an element is detached from the DOM
   */
  static async forDetached(
    locator: Locator,
    timeout = 10_000
  ): Promise<void> {
    await locator.waitFor({ state: 'detached', timeout });
  }

  /**
   * Waits until an element becomes enabled (not disabled)
   */
  static async forEnabled(
    locator: Locator,
    timeout = 10_000
  ): Promise<void> {
    await expect(locator).toBeEnabled({ timeout });
  }

  /**
   * Waits until an element becomes disabled
   */
  static async forDisabled(
    locator: Locator,
    timeout = 10_000
  ): Promise<void> {
    await expect(locator).toBeDisabled({ timeout });
  }

  /* ---------------------------
     Assertions (Wait + Verify)
  ---------------------------- */

  /**
   * Waits until text is present in element
   */
  static async forText(
    locator: Locator,
    text: string | RegExp,
    timeout = 10_000
  ): Promise<void> {
    await expect(locator).toHaveText(text, { timeout });
  }

  /**
   * Waits until element count matches expected value
   */
  static async forCount(
    locator: Locator,
    count: number,
    timeout = 10_000
  ): Promise<void> {
    await expect(locator).toHaveCount(count, { timeout });
  }

  /* ---------------------------
     Utility / Debug
  ---------------------------- */

  /**
   * Waits until condition function returns true
   * Use sparingly for edge cases
   */
  static async until(
    page: Page,
    condition: () => Promise<boolean>,
    timeout = 10_000,
    interval = 500
  ): Promise<void> {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      if (await condition()) return;
      await page.waitForTimeout(interval);
    }

    throw new Error('Wait.until: condition not met within timeout');
  }

/**
   * ⏸ Visual-only pause for LOCAL debugging.
   * ❗ Never use this for assertions or synchronization.
   * ❗ Skipped automatically in CI.
   */
  static async pause(
    page: Page,
    ms: number = 3_000
  ): Promise<void> {
    if (process.env.CI) return;

    await page.waitForTimeout(ms);
  }
}
