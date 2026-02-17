import { test } from '../../../lib/fixtures';
import { URLS } from '../../../config/urls';
import { USER_ROLES } from '../../../lib/data/constants/roles';
import { Logger } from '../../../lib/utils/Logger';

/**
 * Dashboard Test Suite - Comprehensive Demo
 * 
 * This suite demonstrates dashboard functionality for OrangeHRM demo application.
 * It covers:
 * - Dashboard visibility and navigation
 * - User role-based dashboard access
 * - Admin role-based dashboard access
 * - Dashboard elements verification
 * 
 * Purpose: GitHub Demo & Reference Implementation
 */

test.describe('Dashboard Tests - User Role', () => {
    test(
        'DASH-001: User can access dashboard successfully',
        { tag: ['@smoke', '@regression'] },
        async ({ userPage }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'critical' },
                { type: 'feature', description: 'Dashboard' },
                { type: 'story', description: 'DASH-001: User Dashboard Access' }
            );

            Logger.step('Step 1: Verify User dashboard loads');
            await userPage.verifyDashboardLoaded();

            Logger.info('✅ User dashboard accessible');
        }
    );

    test(
        'DASH-002: User dashboard displays Assign Leave option',
        { tag: ['@smoke', '@regression'] },
        async ({ userPage }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'normal' },
                { type: 'feature', description: 'Dashboard' }
            );

            Logger.step('Step 1: Navigate to dashboard');
            await userPage.goto(URLS.DASHBOARD);

            Logger.step('Step 2: Verify Assign Leave is visible');
            await userPage.verifyAssignLeaveVisible();

            Logger.info('✅ User can see Assign Leave option');
        }
    );

    test(
        'DASH-003: User can navigate to dashboard directly',
        { tag: ['@regression'] },
        async ({ loginAs, dashboardPage }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'normal' },
                { type: 'feature', description: 'Dashboard Navigation' }
            );

            Logger.step('Step 1: Login as User');
            await loginAs(USER_ROLES.USER);

            Logger.step('Step 2: Navigate to dashboard URL');
            await dashboardPage.goto(URLS.DASHBOARD);

            Logger.step('Step 3: Verify dashboard loaded');
            await dashboardPage.verifyDashboardLoaded();

            Logger.info('✅ User can navigate to dashboard URL directly');
        }
    );
});

test.describe('Dashboard Tests - Admin Role', () => {
    test(
        'DASH-101: Admin can access dashboard successfully',
        { tag: ['@smoke', '@regression'] },
        async ({ adminPage }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'critical' },
                { type: 'feature', description: 'Dashboard' },
                { type: 'story', description: 'DASH-101: Admin Dashboard Access' }
            );

            Logger.step('Step 1: Verify Admin dashboard loads');
            await adminPage.verifyDashboardLoaded();

            Logger.info('✅ Admin dashboard accessible');
        }
    );

    test(
        'DASH-102: Admin dashboard displays Assign Leave option',
        { tag: ['@smoke', '@regression'] },
        async ({ adminPage }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'normal' },
                { type: 'feature', description: 'Dashboard' }
            );

            Logger.step('Step 1: Navigate to dashboard');
            await adminPage.goto(URLS.DASHBOARD);

            Logger.step('Step 2: Verify Assign Leave is visible');
            await adminPage.verifyAssignLeaveVisible();

            Logger.info('✅ Admin can see Assign Leave option');
        }
    );

    test(
        'DASH-103: Admin can navigate to dashboard directly',
        { tag: ['@regression'] },
        async ({ loginAs, dashboardPage }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'normal' },
                { type: 'feature', description: 'Dashboard Navigation' }
            );

            Logger.step('Step 1: Login as Admin');
            await loginAs(USER_ROLES.ADMIN);

            Logger.step('Step 2: Navigate to dashboard URL');
            await dashboardPage.goto(URLS.DASHBOARD);

            Logger.step('Step 3: Verify dashboard loaded');
            await dashboardPage.verifyDashboardLoaded();

            Logger.info('✅ Admin can navigate to dashboard URL directly');
        }
    );
});

test.describe('Dashboard Tests - Common Functionality', () => {
    test(
        'DASH-201: Dashboard Assign Leave option is visible',
        { tag: ['@smoke', '@regression'] },
        async ({ dashboardPage }) => {
            Logger.step('Step 1: Navigate to dashboard');
            await dashboardPage.goto(URLS.DASHBOARD);

            Logger.step('Step 2: Verify Assign Leave option visibility');
            await dashboardPage.verifyAssignLeaveVisible();

            Logger.info('✅ Assign Leave option verification successful');
        }
    );

    test(
        'DASH-202: Dashboard loads after login',
        { tag: ['@regression'] },
        async ({ loginAs, dashboardPage }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'normal' },
                { type: 'feature', description: 'Post-Login Navigation' }
            );

            Logger.step('Step 1: Login as any user');
            await loginAs(USER_ROLES.USER);

            Logger.step('Step 2: Verify dashboard is displayed');
            await dashboardPage.verifyDashboardLoaded();

            Logger.info('✅ Dashboard loads correctly after authentication');
        }
    );
});
