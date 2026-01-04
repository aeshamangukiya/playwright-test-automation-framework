# playwright-test-automation-framework 
### *Built with Playwright, TypeScript, Test Runner, Allure Reports & Page Object Model (POM)*

---

## Overview

This project is an **end-to-end test automation framework** built to validate critical **user onboarding, authentication, group access, and dashboard flows** for the playwright-test-automation-framework web platform.

The framework focuses on **UI automation**, ensuring a smooth and secure experience across **signup, login, OTP verification, group joining, and session access journeys**.  
It is designed to be **scalable, maintainable, and CI/CD-ready**, following modern automation best practices.

---

## Key Objectives

- Validate user authentication and onboarding flows  
- Ensure group join and access control behavior  
- Verify dashboard visibility and navigation  
- Support smoke and regression test execution  
- Enable fast feedback for staging and CI pipelines  

---

## Tech Stack

| Technology | Purpose |
|-----------|--------|
| Playwright | End-to-end web automation |
| TypeScript | Test scripting and type safety |
| Node.js | Runtime environment |
| Playwright Test Runner | Test execution |
| Allure / Playwright Reports | Reporting |
| GitHub | Version control |
| CI/CD | GitHub Actions compatible |

---

## Framework Highlights

- Page Object Model (POM) for reusable and clean test code  
- Custom fixtures for authenticated sessions  
- Environment-based configuration (URLs, users, devices)  
- Role-based testing support  
- Smoke and regression execution support  
- Storage state handling for faster test runs  
- Centralized utilities for waits, assertions, and logging  

---
## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/aeshamangukiya/playwright-automation-practice
cd playwright-automation-practice
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Tests
- Run all tests:
  ```bash
  npx playwright test
  ```

- Run with headed browser:
  ```bash
  npx playwright test --headed
  ```

- Run specific file:
  ```bash
  npx playwright test tests/auth/login.spec.ts
  ```

- Run with UI Mode:
  ```bash
  npx playwright test --ui
  ```

### 4. Generate Reports
- View Playwright HTML report:
  ```bash
  npx playwright show-report
  ```

- Allure Report (if configured):
  ```bash
  allure generate allure-results --clean -o allure-report
  allure open allure-report
  ```

---
## Project Structure
<details> <summary>Click to expand</summary>

```text
📁 playwright-test-automation-framework/
├── 📄 playwright.config.ts        # Global configuration (baseURL, retries, etc.)
├── 📄 package.json                # NPM dependencies & scripts
├── 📄 tsconfig.json               # TypeScript configuration

📁 tests/                          # Test specs
│   ├── 📁 auth/
│   │   └── login.spec.ts          # Login tests
│   ├── 📁 dashboard/
│   │   └── dashboard.spec.ts      # Dashboard tests
│   └── other-feature.spec.ts

📁 pages/                          # Page Object Model (POM) classes
│   └── LoginPage.ts
│   └── DashboardPage.ts

📁 fixtures/                       # Test data, custom fixtures
│   └── testData.json

📁 utils/                          # Helper utilities
│   └── helpers.ts

📁 reports/                        # Auto-generated HTML & Allure reports
```
</details>

---

## Test Coverage (High Level)

- Authentication (Login, OTP, session handling)
- Group join and access eligibility
- Dashboard access and navigation
- Role-based user validations
- Smoke and regression scenarios

---

## Sample Test Case

**tests/auth/login.spec.ts**
```ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import testData from '../../fixtures/testData.json';

test('Verify user can login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo('/');
  await loginPage.login(testData.validUser.username, testData.validUser.password);

  await expect(page).toHaveURL(/.*dashboard/);
});
```
---

## Naming Conventions

| Component        | Convention | Example                         |
| ---------------- | ---------- | ------------------------------- |
| Packages/Folders | kebab-case | `tests/auth`, `utils/helpers`   |
| Classes          | PascalCase | `LoginPage.ts`, `DashboardPage.ts` |
| Methods/Vars     | camelCase  | `navigateTo()`, `isUserLoggedIn` |

---

## Execution

```bash
# Install dependencies
npm install

# Run all tests
npx playwright test

# Run smoke tests
smoke.bat

# Run regression tests
regression.bat
```

---

## Reporting & Logging
- **Playwright HTML Report:** Generated automatically after execution in `/playwright-report/`.
- **Allure Report:** Generated if configured via `allure-playwright`.
- **Screenshots, Videos & Traces:** Stored automatically under `test-results/`.

---

## Contact & Credits
- Maintained by: **Aesha Mangukiya**  
- Email: **aeshamangukiya1@gmail.com**  
- GitHub: [aeshamangukiya](https://github.com/aeshamangukiya)