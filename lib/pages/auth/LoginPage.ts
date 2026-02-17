import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { ENV } from '../../../config/env';
import { MESSAGES } from '../../data/constants/messages';

export class LoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly logInButton: Locator;

    constructor(page: Page) {
        super(page);

        this.usernameInput = page.getByRole('textbox', { name: 'username' });
        this.passwordInput = page.getByRole('textbox', { name: 'password' });
        this.logInButton = page.getByRole('button', { name: /login/i });
    }

    /* ---------------------------
       Actions
    ---------------------------- */

    async openLoginPage() {
        await this.goto(ENV.BASE_URL);
    }

    async login(username: string, password: string) {
        await this.stableFill(this.usernameInput, username);
        await this.stableFill(this.passwordInput, password);

        // Real user submit
        await this.click(this.logInButton);
    }

    /* ---------------------------
       Assertions
    ---------------------------- */

    async verifyErrorMessage(expectedMessage: string) {
        if (expectedMessage === 'Invalid credentials') {
            await this.expectVisible(this.page.getByRole('alert'));
            await this.expectText(this.page.getByRole('alert'), expectedMessage);
        } else {
            // For empty fields, OrangeHRM shows "Required" under the field
            await this.expectVisible(this.page.getByText(expectedMessage).first());
        }
    }
}
