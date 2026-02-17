/**
 * Centralized URL Configuration
 * Contains: Application routes and external URLs
 */
export const URLS = {
    // Auth
    LOGIN: '/web/index.php/auth/login',

    // Dashboard
    DASHBOARD: '/web/index.php/dashboard/index',

    // Modules
    PIM: '/web/index.php/pim/viewEmployeeList',
    LEAVE: '/web/index.php/leave/viewLeaveList',
} as const;
