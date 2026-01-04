import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/auth/LoginPage';
import { users } from '../test-data/users';
import { UserRole } from '../constants/roles';

type Fixtures = {
  loginAs: (role: UserRole) => Promise<void>;
};

export const test = base.extend<Fixtures>({
  loginAs: async ({ page }, use) => {
    await use(async (role: UserRole) => {
      const loginPage = new LoginPage(page);
      const user = users[role];

      await loginPage.openLoginPage();
      await loginPage.login(user.username, user.password);
    });
  }
});

export { expect } from '@playwright/test';
