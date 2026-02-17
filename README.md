## OrangeHRM – Playwright Test Automation Framework

[![Playwright](https://img.shields.io/badge/tested%20with-Playwright-45ba4b)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6)](https://www.typescriptlang.org/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF)](https://github.com/features/actions)
[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

**Production-ready E2E test automation framework for [OrangeHRM](https://www.orangehrm.com/) using Playwright, TypeScript, Allure Reports & Page Object Model (POM).**

>  **Demo & Reference Implementation** - This framework is designed as a comprehensive reference for GitHub users to understand enterprise-level Playwright test automation patterns and best practices.

---

##  Overview

This project is a **production-grade, end-to-end test automation framework** for **OrangeHRM** (open-source HR management system). It demonstrates comprehensive testing patterns including **authentication**, **dashboard verification**, and **role-based access control (RBAC)** using the official demo instance: **https://opensource-demo.orangehrmlive.com**.

The framework is **enterprise-ready, scalable, maintainable, and fully CI/CD-integrated** with:
-  Environment-based configuration
-  Role-based fixtures (User / Admin)
-  Shared authentication state for faster execution
-  Advanced GitHub Actions CI/CD pipeline with parallel execution
-  Comprehensive test coverage (positive, negative, validation, RBAC)

---

##  What is Tested

### **Authentication Tests**
-  **Positive Scenarios**: User login, Admin login, direct login via LoginPage
-  **Negative Scenarios**: Invalid username, invalid password, both invalid
-  **Validation Tests**: Empty username, empty password, both fields empty
-  **RBAC Tests**: User role access, Admin role access

### **Dashboard Tests**
-  **User Role**: Dashboard access, Assign Leave visibility, direct navigation
-  **Admin Role**: Dashboard access, Assign Leave visibility, direct navigation
-  **Common**: Post-login navigation, element visibility checks

### **Technical Coverage**
-  Session handling & storage state reuse
-  Role-based authentication via `loginAs(USER_ROLES.USER)` and `loginAs(USER_ROLES.ADMIN)`
-  URL validation and navigation patterns
-  Business-level assertions and logging

---

##  Test Coverage

The framework includes **15 comprehensive test cases** covering:

| Category | Test Count | Tags |
|----------|-----------|------|
| **Positive Tests** (Success scenarios) | 9 | @smoke, @regression, @critical |
| **Negative Tests** (Error handling) | 3 | @regression, @negative |
| **Validation Tests** (Form validation) | 3 | @regression, @validation |
| **RBAC Tests** (Role-based access) | 2 | @regression, @rbac |

**Test Breakdown by Feature:**
-  **Authentication**: 11 tests (login success, failures, validation, RBAC)
-  **Dashboard**: 8 tests (User/Admin access, navigation, elements)

**Execution Options:**
- **Smoke Suite** (`@smoke`): 8 tests, ~2-3 min - Critical path validation
- **Regression Suite** (`@regression`): 15 tests, ~8-10 min - Full coverage
- **Tag Filtering**: `@critical`, `@negative`, `@validation`, `@rbac`

📖 **[View Complete Test Coverage Documentation](docs/test-coverage.md)** - Detailed test case listing, execution strategies, and statistics.

---

##  Key Features

- **Page Object Model (POM)** — `BasePage` + feature pages (e.g. `LoginPage`, `DashboardPage`)
- **Custom fixtures** — `loginAs(role)` for User or Admin, shared `loginPage` and `dashboardPage`
- **Auth setup project** — Login once in `auth.setup.ts`, persist state to `storage/user.auth.json` for dependent tests
- **Environment-based config** — Staging/production base URL and users via `.env` (see `.env.example`)
- **Centralized config** — `config/env.ts`, `config/browser.ts`, `config/urls.ts` for ENV, timeouts, and app routes
- **Dual reporting** — Playwright HTML report + Allure
- **Tagged execution** — `@smoke`, `@regression`, `@critical` for selective runs
- **Helpers** — `Logger`, `AssertionHelper`, `Wait`; constants in `lib/data/constants` (roles, messages, UI, app)

---

## Tech Stack

| Technology           | Purpose                        |
|----------------------|--------------------------------|
| Playwright           | E2E web automation             |
| TypeScript           | Test code & type safety        |
| Node.js              | Runtime                        |
| Playwright Test      | Runner, projects, fixtures     |
| Allure + HTML Report | Reporting                      |
| dotenv               | `.env` for base URL & users    |
| GitHub Actions       | CI/CD ready                    |

---

## Prerequisites

- **Node.js** 18+
- **npm** 9+
- **Chrome** (Playwright uses `channel: 'chrome'`)

---

## Documentation

| Document | Description |
|----------|-------------|
| **[Quick Start Guide](docs/quick-start.md)** | Get started in 5 minutes with step-by-step setup |
| **[Test Coverage](docs/test-coverage.md)** | Complete test case documentation with 15+ scenarios |
| **[Architecture Overview](docs/architecture.md)** | Framework design, patterns, and best practices |
| **[Setup Guide](docs/setup-guide.md)** | Detailed setup and configuration instructions |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/playwright-test-automation-framework.git
cd playwright-test-automation-framework
```

### 2. Install dependencies

```bash
npm install
npx playwright install chromium
```

### 3. Environment setup

Copy `.env.example` to `.env` and adjust if needed. Defaults point to OrangeHRM demo:

```env
ENVIRONMENT=staging

# Staging (OrangeHRM demo)
STAGING_BASE_URL=https://opensource-demo.orangehrmlive.com
STAGING_USER_USERNAME=Admin
STAGING_USER_PASSWORD=admin123
STAGING_ADMIN_USERNAME=Admin
STAGING_ADMIN_PASSWORD=admin123

# Production (your own instance)
PRODUCTION_BASE_URL=https://your-orangehrm-instance.com
PRODUCTION_USER_USERNAME=...
PRODUCTION_USER_PASSWORD=...
PRODUCTION_ADMIN_USERNAME=...
PRODUCTION_ADMIN_PASSWORD=...
```

### 4. Run tests

```bash
# Run all tests
npm test

# Headed browser
npm run test:headed

# Specific spec
npx playwright test specs/features/auth/login.spec.ts

# Smoke or regression only
npm run test:smoke
npm run test:regression

# UI mode
npx playwright test --ui
```

### 5. View reports

- **Playwright HTML:** `npx playwright show-report`
- **Allure:** `npm run allure:report` (or `allure:generate` then `allure:open`)

---

## Project Structure

```
playwright-test-automation-framework/
├── playwright.config.ts     # Projects (prepare-auth, after-login, before-login), reporters, baseURL
├── package.json             # Scripts & dependencies
├── tsconfig.json
├── .env                     # Not committed; copy from .env.example

├── config/
│   ├── env.ts               # ENV from .env (staging/production BASE_URL & users)
│   ├── browser.ts           # Timeouts, browser options
│   └── urls.ts              # App routes (LOGIN, DASHBOARD, PIM, LEAVE)

├── specs/
│   ├── setup/
│   │   └── auth.setup.ts    # Login once, save storage state for after-login project
│   └── features/
│       ├── auth/
│       │   └── login.spec.ts
│       └── dashboard/
│           └── dashboard.spec.ts

├── lib/
│   ├── fixtures/
│   │   └── index.ts         # test, loginAs(role), loginPage, dashboardPage (User/Admin)
│   ├── pages/
│   │   ├── base/
│   │   │   └── BasePage.ts  # goto, click, stableFill, expectVisible
│   │   ├── auth/
│   │   │   └── LoginPage.ts
│   │   └── dashboard/
│   │       └── DashboardPage.ts
│   ├── data/
│   │   ├── users.ts         # User credentials (from ENV)
│   │   └── constants/       # roles, messages, app-constants, ui-constants
│   ├── helpers/
│   │   └── AssertionHelper.ts
│   └── utils/
│       ├── Logger.ts
│       └── Wait.ts

├── storage/                 # user.auth.json (saved session)
├── test-results/            # Screenshots, videos, traces
├── playwright-report/
└── allure-results/
```

---

## Test Projects (playwright.config.ts)

| Project        | Purpose                               | Storage state    |
|----------------|----------------------------------------|------------------|
| `prepare-auth` | Runs `*.setup.ts`; logs in once        | Writes to storage |
| `after-login`  | All other specs (use saved session)    | Uses storage      |
| `before-login` | Login specs only (fresh session)       | None              |

---

## Sample Tests

### **Positive Login Test**

**specs/features/auth/login.spec.ts**

```ts
import { test } from '../../../lib/fixtures';
import { USER_ROLES } from '../../../lib/data/constants/roles';
import { DashboardPage } from '../../../lib/pages/dashboard/DashboardPage';
import { Logger } from '../../../lib/utils/Logger';

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

            Logger.info('User login successful - Dashboard accessible');
        }
    );
});
```

### **Negative Login Test**

```ts
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

            Logger.info('Invalid username correctly rejected');
        }
    );
});
```

### **Dashboard Test with Role Fixture**

**specs/features/dashboard/dashboard.spec.ts**

```ts
test.describe('Dashboard Tests - Admin Role', () => {
    test(
        'DASH-101: Admin can access dashboard successfully',
        { tag: ['@smoke', '@regression'] },
        async ({ adminPage }, testInfo) => {
            testInfo.annotations.push(
                { type: 'severity', description: 'critical' },
                { type: 'feature', description: 'Dashboard' }
            );

            Logger.step('Step 1: Verify Admin dashboard loads');
            await adminPage.verifyDashboardLoaded();

            Logger.info('Admin dashboard accessible');
        }
    );
});
```

---

## NPM Scripts & Tagging Strategy

| Script                      | Description                              |
|-----------------------------|------------------------------------------|
| `npm test`                  | Run all Playwright tests                 |
| `npm run test:smoke`        | Run tests tagged with `@smoke`           |
| `npm run test:regression`   | Run tests tagged with `@regression`      |
| `npm run test:headed`       | Run all tests in headed mode             |
| `npm run smoke`             | Legacy alias for `npm run test:smoke`    |
| `npm run regression`        | Legacy alias for `npm run test:regression` |
| `npm run allure:generate`   | Generate Allure report                    |
| `npm run allure:open`       | Open Allure report                        |
| `npm run allure:report`     | Generate + open Allure                    |
| `npm run clean:allure`      | Remove Allure results/report artifacts    |

**Tagging strategy:**

- `@smoke` – High-value, fast checks to validate core flows.
- `@regression` – Broader coverage for regular regression runs.
- `@critical` – Business-critical scenarios (e.g. happy path login).

Tags are attached via the Playwright [`test` configuration](https://playwright.dev/docs/test-annotations) and can be combined for flexible selection.

---

## Role-Based Fixtures

Role-based fixtures live in `lib/fixtures` and are used across specs and setup:

- `loginAs(role)` – Logs in as `USER_ROLES.USER` or `USER_ROLES.ADMIN`.
- `userPage` – Dashboard pre-logged in as a standard user.
- `adminPage` – Dashboard pre-logged in as an admin.

Example usage:

```ts
import { test } from '../../../lib/fixtures';
import { USER_ROLES } from '../../../lib/data/constants/roles';

test('User can login successfully', async ({ loginAs, page }) => {
    await loginAs(USER_ROLES.USER);
    // assertions...
});
```

Behind the scenes, credentials are read from `.env` through `config/env.ts` and `lib/data/users.ts`, ensuring no direct `process.env` access in tests or pages.

---

## Naming Conventions

| Component      | Convention | Example                           |
|----------------|------------|-----------------------------------|
| Folders        | kebab-case | `specs/features`, `lib/pages`     |
| Page classes   | PascalCase | `LoginPage.ts`, `DashboardPage.ts`|
| Methods / vars | camelCase  | `verifyDashboardLoaded()`, `loginAs` |
| Spec files     | kebab-case | `login.spec.ts`, `dashboard.spec.ts` |

---

## Reporting & Artifacts

- **Playwright HTML report** — `playwright-report/` (open with `npx playwright show-report`)
- **Allure** — `allure-results/` → generate → `allure-report/`
- **On failure** — Screenshots, video, trace in `test-results/`

---

## CI/CD - GitHub Actions

The framework includes a **production-ready GitHub Actions workflow** with advanced features:

### **Pipeline Features**
-  **Multi-job execution**: Smoke tests (fast feedback) + Regression tests (full coverage)
-  **Test sharding**: Parallel execution across 2 runners for faster completion
-  **Conditional execution**: Smart triggers based on event type (push/PR/manual)
-  **Manual dispatch**: Run specific test suites on-demand via workflow_dispatch
-  **Combined reporting**: Aggregates Allure results from all shards
-  **Artifact management**: Separate retention policies for different report types
-  **Test summary**: Auto-generated summary in GitHub Actions UI

### **Workflow Jobs**

1. **Smoke Tests** (15 min timeout)
   - Triggers: Pull requests or manual smoke selection
   - Runs: `npm run test:smoke`
   - Purpose: Fast validation of critical paths

2. **Regression Tests** (60 min timeout)
   - Triggers: Push to main/master or manual regression selection  
   - Runs: Tests split across 2 parallel shards
   - Purpose: Full test coverage with optimized execution time

3. **Generate Report**
   - Combines Allure results from all jobs
   - Creates unified test report
   - Retention: 30 days

4. **Test Summary**
   - Displays execution status in GitHub Actions summary
   - Shows pass/fail for each job
   - Lists available artifacts

### **Running in CI**

The workflow automatically runs on:
```yaml
# Auto-triggers
- Push to: main, master, develop branches
- Pull requests to: main, master branches

# Manual trigger (Actions tab)
- Workflow dispatch with options: all, smoke, regression
```

### **Environment Variables**

Set these as GitHub repository secrets for production:
```bash
ENVIRONMENT=staging
STAGING_BASE_URL=<your-url>
STAGING_USER_USERNAME=<user>
STAGING_USER_PASSWORD=<password>
STAGING_ADMIN_USERNAME=<admin>
STAGING_ADMIN_PASSWORD=<password>
```

For the OrangeHRM demo, no secrets are needed - the workflow uses default demo credentials from `.env` file.

### **Viewing Reports**

After workflow completion:
1. Go to **Actions** tab
2. Click on the workflow run
3. Download artifacts:
   - `playwright-report-smoke` - Smoke test HTML report
   - `playwright-report-regression-shard-*` - Regression HTML reports
   - `allure-report-combined` - Combined Allure report
   - `test-results-shard-*` - Screenshots, videos, traces

---

## License

ISC

---


## Contributing

1. Fork the repo  
2. Create a branch (`git checkout -b feature/your-feature`)  
3. Commit (`git commit -m 'Add some feature'`)  
4. Push (`git push origin feature/your-feature`)  
5. Open a Pull Request  

---

## 📋 Version History

See **[CHANGELOG.md](CHANGELOG.md)** for detailed release notes and version history.

**Current Version**: 1.0.0 (Production Ready)

---

## 📚 Additional Resources

- **[Playwright Documentation](https://playwright.dev)** - Official Playwright docs
- **[OrangeHRM Demo](https://opensource-demo.orangehrmlive.com)** - Live demo application
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript reference
- **[Allure Reports](https://docs.qameta.io/allure/)** - Allure reporting docs

---


## Contact & Credits
- Maintained by: Aesha Mangukiya
- Email: aeshamangukiya1@gmail.com
- GitHub: [GitHub: aeshamangukiya](https://github.com/aeshamangukiya)
  
---

