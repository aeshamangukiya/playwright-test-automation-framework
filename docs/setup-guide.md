## Setup Guide

This guide walks through **local setup**, **environment configuration**, and **how to run tests** in this Playwright framework.

---

## 1. Prerequisites

- **Node.js** 18+  
- **npm** 9+  
- **Git** (for cloning the repository)  
- **Chrome** browser (tests use `channel: 'chrome'`)

Verify Node and npm:

```bash
node -v
npm -v
```

---

## 2. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/playwright-test-automation-framework.git
cd playwright-test-automation-framework
```

Replace `YOUR_USERNAME` with your GitHub handle when you publish the project.

---

## 3. Install Dependencies

```bash
npm install
npx playwright install chromium
```

For CI (Linux containers), you may prefer:

```bash
npx playwright install --with-deps chromium
```

---

## 4. Environment Configuration (`.env`)

### 4.1 Create `.env` from template

An example file is provided:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 4.2 `.env` variables

The framework supports **staging** and **production** profiles out of the box:

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

Notes:

- `ENVIRONMENT` controls which profile is used at runtime (`staging` or `production`).
- All values are accessed via `config/env.ts`; tests and pages **never** access `process.env` directly.

---

## 5. Running Tests

All commands are defined in `package.json` scripts for a consistent developer experience.

### 5.1 Full test run

```bash
npm test
```

Equivalent to:

```bash
npx playwright test
```

### 5.2 Tagged test runs

Tags:

- `@smoke` – Fast, high-value checks.
- `@regression` – Broader coverage.
- `@critical` – Business-critical scenarios.

Scripts:

```bash
# Smoke tests
npm run test:smoke

# Regression tests
npm run test:regression
```

`test:smoke` and `test:regression` automatically:

- Clean previous Allure artifacts.
- Run Playwright tests filtered by tag.

(Legacy aliases `npm run smoke` and `npm run regression` are kept for backwards compatibility.)

### 5.3 Headed / interactive runs

```bash
# Run all tests headed
npm run test:headed

# UI mode (exploratory)
npx playwright test --ui
```

### 5.4 Running a single spec

```bash
npx playwright test specs/features/auth/login.spec.ts
npx playwright test specs/features/dashboard/dashboard.spec.ts
```

---

## 6. Role-Based Fixtures

The framework exposes **role-aware fixtures** from `lib/fixtures`:

- `loginAs(role)` – Logs in as `USER_ROLES.USER` or `USER_ROLES.ADMIN`.
- `userPage` – Dashboard page pre-logged in as regular user.
- `adminPage` – Dashboard page pre-logged in as admin.

Example:

```ts
import { test } from '../../../lib/fixtures';
import { USER_ROLES } from '../../../lib/data/constants/roles';

test('User can login successfully', async ({ loginAs, page }) => {
    await loginAs(USER_ROLES.USER);
    // ... assertions using page / DashboardPage
});
```

This keeps **authentication logic in one place** and allows tests to focus on behaviour.

---

## 7. Storage State & Projects

The `playwright.config.ts` file defines three projects:

- **`prepare-auth`**
  - Runs `specs/setup/auth.setup.ts`.
  - Logs in once and saves storage state (`storage/user.auth.json`).

- **`after-login`**
  - Depends on `prepare-auth`.
  - Uses the saved storage state for faster, authenticated runs.

- **`before-login`**
  - Focused on login scenarios.
  - Starts from a clean, unauthenticated state.

You typically just run `npm test` and let these projects orchestrate themselves.

---

## 8. Reports & Artifacts

### 8.1 Playwright HTML report

```bash
npx playwright show-report
```

Artifacts are stored under:

- `playwright-report/`
- `test-results/` (screenshots, videos, traces)

### 8.2 Allure report

```bash
# Generate
npm run allure:generate

# Open
npm run allure:open

# Generate + open
npm run allure:report
```

Allure artifacts:

- Raw results: `allure-results/`
- Generated report: `allure-report/`

---

## 9. CI/CD Notes

In CI (e.g. GitHub Actions):

- Set `.env` values via secrets or environment variables.
- Ensure browsers are installed:

```bash
npx playwright install --with-deps chromium
```

Run the tests:

```bash
npm test
```

Minimal GitHub Actions step:

```yaml
- name: Run Playwright tests
  run: npm test
  env:
    ENVIRONMENT: staging
    STAGING_BASE_URL: ${{ secrets.STAGING_BASE_URL }}
    STAGING_USER_USERNAME: ${{ secrets.STAGING_USER_USERNAME }}
    STAGING_USER_PASSWORD: ${{ secrets.STAGING_USER_PASSWORD }}
    STAGING_ADMIN_USERNAME: ${{ secrets.STAGING_ADMIN_USERNAME }}
    STAGING_ADMIN_PASSWORD: ${{ secrets.STAGING_ADMIN_PASSWORD }}
```

---

## 10. Troubleshooting

- **Tests cannot reach the app**
  - Check `ENVIRONMENT` and `*_BASE_URL` values in `.env`.
  - Verify the app is reachable from your machine/CI agent.

- **Login failures**
  - Confirm user credentials in `.env` match those configured in the target environment.
  - Check that the login form selectors in `LoginPage` still match the UI.

- **Slow tests**
  - Review `BROWSER_CONFIG.TIMEOUTS` and `Wait` usage.
  - Avoid adding hard sleeps; prefer `Wait` helpers or `BasePage` methods.

