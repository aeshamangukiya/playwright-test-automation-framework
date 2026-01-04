# playwright-test-automation-framewor 
### *End-to-End Web Automation using Playwright & TypeScript*

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

## Project Structure

```text
playwright-test-automation-framework/
├── src/
│   ├── config/          # Environment, URLs, devices
│   ├── constants/       # Roles, permissions, messages
│   ├── fixtures/        # Auth and custom fixtures
│   ├── pages/           # Page Objects
│   ├── services/        # Helper services
│   ├── test-data/       # Test data
│   └── utils/           # Waits, assertions, logger
│
├── tests/
│   ├── auth/             # Authentication tests
│   ├── dashboard/        # Dashboard tests
│   └── setup/            # Test setup and auth state
│
├── playwright.config.ts
├── package.json
├── smoke.bat
├── regression.bat
└── README.md
```

---

## Test Coverage (High Level)

- Authentication (Login, OTP, session handling)
- Group join and access eligibility
- Dashboard access and navigation
- Role-based user validations
- Smoke and regression scenarios

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

## Reporting

- Playwright HTML Report
- Allure Results (if enabled)
- Test results stored under `test-results/`

---

## Author

**Aesha Mangukiya**  
QA Engineer 
