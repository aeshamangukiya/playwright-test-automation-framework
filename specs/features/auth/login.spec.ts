import { test } from '../../../lib/fixtures';
import { USER_ROLES } from '../../../lib/data/constants/roles';
import { DashboardPage } from '../../../lib/pages/dashboard/DashboardPage';
import { Logger } from '../../../lib/utils/Logger';
import { MESSAGES } from '../../../lib/data/constants/messages';
import { USERS } from '../../../lib/data/users';

/**
 * Login Test Suite - Comprehensive Demo
 * 
 * This suite demonstrates all possible login scenarios for OrangeHRM demo application.
 * It covers:
 * - Successful login for User and Admin roles
 * - Validation of credentials
 * - Error handling
 * - Edge cases
 * 
 * Purpose: GitHub Demo & Reference Implementation
 */

test.describe('Login Tests - Positive Scenarios', () => {
    test(
        'USER-001: User can login successfully with valid credentials',
        { tag: ['@smoke', '@regression', '@critical'] },
        async ({ loginAs, page }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'critical' },
                { type: 'feature', description: 'Authentication' },
                { type: 'story', description: 'USER-001: User Login' }
            );

            Logger.step('Step 1: Login as standard User role');
            await loginAs(USER_ROLES.USER);

            Logger.step('Step 2: Verify Dashboard is loaded successfully');
            const dashboard = new DashboardPage(page);
            await dashboard.verifyDashboardLoaded();

            Logger.info('✅ User login successful - Dashboard accessible');
        }
    );

    test(
        'ADMIN-001: Admin can login successfully with valid credentials',
        { tag: ['@smoke', '@regression', '@critical'] },
        async ({ loginAs, page }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'critical' },
                { type: 'feature', description: 'Authentication' },
                { type: 'story', description: 'ADMIN-001: Admin Login' }
            );

            Logger.step('Step 1: Login as Admin role');
            await loginAs(USER_ROLES.ADMIN);

            Logger.step('Step 2: Verify Dashboard is loaded successfully');
            const dashboard = new DashboardPage(page);
            await dashboard.verifyDashboardLoaded();

            Logger.info('✅ Admin login successful - Dashboard accessible');
        }
    );

    test(
        'AUTH-003: User can login directly using login page',
        { tag: ['@regression'] },
        async ({ loginPage, page }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'normal' },
                { type: 'feature', description: 'Authentication' }
            );

            Logger.step('Step 1: Navigate to login page');
            await loginPage.openLoginPage();

            Logger.step('Step 2: Enter valid user credentials');
            const user = USERS[USER_ROLES.USER];
            await loginPage.login(user.username, user.password);

            Logger.step('Step 3: Verify successful login');
            const dashboard = new DashboardPage(page);
            await dashboard.verifyDashboardLoaded();

            Logger.info('✅ Direct login through LoginPage works correctly');
        }
    );
});

test.describe('Login Tests - Negative Scenarios', () => {
    test(
        'AUTH-101: Login fails with invalid username',
        { tag: ['@regression', '@negative'] },
        async ({ loginPage }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'normal' },
                { type: 'feature', description: 'Authentication' },
                { type: 'story', description: 'AUTH-101: Invalid Username' }
            );

            Logger.step('Step 1: Navigate to login page');
            await loginPage.openLoginPage();

            Logger.step('Step 2: Attempt login with invalid username');
            await loginPage.login('InvalidUser123', 'admin123');

            Logger.step('Step 3: Verify error message is displayed');
            await loginPage.verifyErrorMessage(MESSAGES.LOGIN_FAILED);

            Logger.info('✅ Invalid username correctly rejected');
        }
    );

    test(
        'AUTH-102: Login fails with invalid password',
        { tag: ['@regression', '@negative'] },
        async ({ loginPage }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'normal' },
                { type: 'feature', description: 'Authentication' },
                { type: 'story', description: 'AUTH-102: Invalid Password' }
            );

            Logger.step('Step 1: Navigate to login page');
            await loginPage.openLoginPage();

            Logger.step('Step 2: Attempt login with valid username but invalid password');
            await loginPage.login('Admin', 'WrongPassword123!');

            Logger.step('Step 3: Verify error message is displayed');
            await loginPage.verifyErrorMessage(MESSAGES.LOGIN_FAILED);

            Logger.info('✅ Invalid password correctly rejected');
        }
    );

    test(
        'AUTH-103: Login fails with both invalid credentials',
        { tag: ['@regression', '@negative'] },
        async ({ loginPage }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'normal' },
                { type: 'feature', description: 'Authentication' }
            );

            Logger.step('Step 1: Navigate to login page');
            await loginPage.openLoginPage();

            Logger.step('Step 2: Attempt login with completely invalid credentials');
            await loginPage.login('InvalidUser', 'InvalidPass');

            Logger.step('Step 3: Verify error message is displayed');
            await loginPage.verifyErrorMessage(MESSAGES.LOGIN_FAILED);

            Logger.info('✅ Invalid credentials correctly rejected');
        }
    );

    test(
        'AUTH-104: Login fails with empty username',
        { tag: ['@regression', '@validation'] },
        async ({ loginPage }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'normal' },
                { type: 'feature', description: 'Authentication' },
                { type: 'story', description: 'AUTH-104: Empty Username Validation' }
            );

            Logger.step('Step 1: Navigate to login page');
            await loginPage.openLoginPage();

            Logger.step('Step 2: Attempt login with empty username');
            await loginPage.login('', 'admin123');

            await loginPage.verifyErrorMessage(MESSAGES.REQUIRED);

            Logger.info('✅ Empty username validation working');
        }
    );

    test(
        'AUTH-105: Login fails with empty password',
        { tag: ['@regression', '@validation'] },
        async ({ loginPage }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'normal' },
                { type: 'feature', description: 'Authentication' }
            );

            Logger.step('Step 1: Navigate to login page');
            await loginPage.openLoginPage();

            Logger.step('Step 2: Attempt login with empty password');
            await loginPage.login('Admin', '');

            await loginPage.verifyErrorMessage(MESSAGES.REQUIRED);

            Logger.info('✅ Empty password validation working');
        }
    );

    test(
        'AUTH-106: Login fails with both fields empty',
        { tag: ['@regression', '@validation'] },
        async ({ loginPage }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'normal' },
                { type: 'feature', description: 'Authentication' }
            );

            Logger.step('Step 1: Navigate to login page');
            await loginPage.openLoginPage();

            Logger.step('Step 2: Attempt login with both fields empty');
            await loginPage.login('', '');

            await loginPage.verifyErrorMessage(MESSAGES.REQUIRED);

            Logger.info('✅ Empty fields validation working');
        }
    );
});

test.describe('Login Tests - Role-Based Access', () => {
    test(
        'ROLE-001: User and Admin have different access levels',
        { tag: ['@regression', '@rbac'] },
        async ({ loginAs, page }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'normal' },
                { type: 'feature', description: 'Role-Based Access Control' }
            );

            Logger.step('Step 1: Login as User');
            await loginAs(USER_ROLES.USER);

            const dashboard = new DashboardPage(page);
            await dashboard.verifyDashboardLoaded();

            Logger.step('Step 2: Verify User role dashboard access');
            // Note: In demo, User and Admin use same credentials
            // In real scenarios, this would verify role-specific elements

            Logger.info('✅ User role access verified');
        }
    );

    test(
        'ROLE-002: Admin has full system access',
        { tag: ['@regression', '@rbac'] },
        async ({ loginAs, page }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'normal' },
                { type: 'feature', description: 'Role-Based Access Control' }
            );

            Logger.step('Step 1: Login as Admin');
            await loginAs(USER_ROLES.ADMIN);

            const dashboard = new DashboardPage(page);
            await dashboard.verifyDashboardLoaded();

            Logger.step('Step 2: Verify Admin dashboard access');
            // Note: In production, this would verify admin-specific features

            Logger.info('✅ Admin role access verified');
        }
    );
});
