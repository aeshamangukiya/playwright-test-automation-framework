import { expect, Page } from '@playwright/test';

export class Assertions {
  static async urlContains(page: Page, text: string) {
    await expect(page).toHaveURL(new RegExp(text));
  }
}
