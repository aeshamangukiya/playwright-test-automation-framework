<h1 align="center">Playwright Test Automation Framework</h1>

<p align="center">
  <em>Enterprise-grade end-to-end test automation for the <a href="https://opensource-demo.orangehrmlive.com">OrangeHRM</a> open-source demo, built on Playwright + TypeScript with a strict Page Object Model architecture.</em>
</p>

<p align="center">
  <a href="https://github.com/aeshamangukiya/playwright-test-automation-framework/actions/workflows/smoke.yml"><img src="https://img.shields.io/github/actions/workflow/status/aeshamangukiya/playwright-test-automation-framework/smoke.yml?branch=master&label=smoke&logo=github" alt="Smoke" /></a>
  <a href="https://github.com/aeshamangukiya/playwright-test-automation-framework/actions/workflows/regression.yml"><img src="https://img.shields.io/github/actions/workflow/status/aeshamangukiya/playwright-test-automation-framework/regression.yml?branch=master&label=regression&logo=github" alt="Regression" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <img src="https://img.shields.io/badge/node-%E2%89%A520.x-339933?logo=node.js" alt="Node 20+" />
  <img src="https://img.shields.io/badge/playwright-1.57+-45ba4b?logo=playwright" alt="Playwright" />
  <img src="https://img.shields.io/badge/typescript-strict-3178c6?logo=typescript" alt="TypeScript strict" />
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome" /></a>
</p>

<p align="center">
  <a href="docs/quick-start.md">⚡ Quick Start</a> ·
  <a href="docs/setup-guide.md">🛠️ Setup Guide</a> ·
  <a href="docs/architecture.md">🏗️ Architecture</a> ·
  <a href="docs/test-coverage.md">🧪 Test Coverage</a> ·
  <a href="docs/runbook.md">📓 Runbook</a> ·
  <a href="docs/troubleshooting.md">🆘 Troubleshooting</a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Test Projects](#test-projects)
- [NPM Scripts](#npm-scripts)
- [Tagging Strategy](#tagging-strategy)
- [Role-Based Fixtures](#role-based-fixtures)
- [Sample Tests](#sample-tests)
- [Reporting](#reporting)
- [Continuous Integration](#continuous-integration)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

---

## Overview

This repository is a **production-grade reference implementation** of a Playwright
test framework. It is designed to be cloned, studied, and adapted by teams that
want enterprise-style architecture without starting from scratch.

It targets the **OrangeHRM open-source demo** ( `https://opensource-demo.orangehrmlive.com` )
because it offers stable, public, role-based functionality — but every layer
(config, pages, fixtures, helpers, CI) is generic and swap-friendly for any
other application under test.

> 💡 **Goal:** demonstrate _how to structure_ a Playwright project, not just _how to write_ tests.

---

## Key Features

| Capability                       | What you get                                                                                                          |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Page Object Model**            | `BasePage` with stable primitives (`stableFill`, `click`, `expectVisible`) extended by feature pages                  |
| **Role-based fixtures**          | `loginAs(role)`, `userPage`, `adminPage` — login lives in one place                                                   |
| **Storage-state reuse**          | `setup-auth` Playwright project logs in once; downstream specs reuse the session                                      |
| **Strict env layer**             | `config/env.ts` validates `.env` at startup — fails fast on missing variables                                         |
| **Tag-driven suites**            | `@smoke`, `@regression`, `@critical`, `@negative`, `@validation`, `@rbac`                                             |
| **Dual reporting**               | Playwright HTML + Allure, plus JUnit XML and JSON for CI tooling                                                      |
| **CI-ready GitHub Actions**      | Separate workflows for smoke, sharded regression, and CodeQL security scanning                                        |
| **Quality gates**                | TypeScript strict mode + Dependabot for automated dependency updates                                                  |
| **Governance**                   | `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, issue & PR templates, `CODEOWNERS`                  |

---

## Tech Stack

| Layer            | Technology                              |
| ---------------- | --------------------------------------- |
| Runner           | [Playwright Test](https://playwright.dev) |
| Language         | TypeScript (strict)                     |
| Runtime          | Node.js ≥ 20                            |
| Reporting        | Playwright HTML + Allure                |
| Config           | `dotenv`                                |
| CI               | GitHub Actions, CodeQL, Dependabot      |

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/aeshamangukiya/playwright-test-automation-framework.git
cd playwright-test-automation-framework

# 2. Install dependencies + browsers (requires Node 20+)
npm install
npx playwright install --with-deps chromium

# 3. Configure environment
cp .env.example .env   # Windows: copy .env.example .env

# 4. Run smoke tests
npm run test:smoke
```

Full walkthrough → [docs/quick-start.md](docs/quick-start.md)

---

## Project Structure

```text
playwright-test-automation-framework/
├── .github/
│   ├── workflows/             # CI: smoke, regression, codeql
│   ├── ISSUE_TEMPLATE/        # Bug + Feature templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── CODEOWNERS
│   └── dependabot.yml
├── config/
│   ├── env.ts                 # Strict env loader (.env + ENVIRONMENT)
│   ├── browser.ts             # Viewport + timeouts
│   └── urls.ts                # Application route fragments
├── lib/
│   ├── data/
│   │   ├── users.ts           # ENV-driven user map
│   │   └── constants/         # roles, messages, ui, app
│   ├── fixtures/
│   │   ├── base.fixture.ts    # page objects
│   │   ├── auth.fixture.ts    # loginAs / userPage / adminPage
│   │   └── index.ts           # mergeTests entry point
│   ├── helpers/               # Cross-page business assertions
│   ├── pages/
│   │   ├── base/              # BasePage with stable primitives
│   │   ├── auth/              # LoginPage
│   │   └── dashboard/         # DashboardPage
│   └── utils/                 # Logger, Wait, DataGenerator
├── specs/
│   ├── setup/                 # auth.setup.ts — persists storage state
│   └── features/              # Business-readable specs (auth, dashboard, …)
├── docs/                      # Quick Start, Architecture, Runbook, Troubleshooting…
├── playwright.config.ts       # Projects, reporters, baseURL
├── tsconfig.json              # Strict TS config with path aliases
└── package.json
```

---

## Test Projects

`playwright.config.ts` declares three Playwright projects with explicit dependencies:

| Project           | Purpose                                          | Storage state               |
| ----------------- | ------------------------------------------------ | --------------------------- |
| `setup-auth`      | Runs `*.setup.ts` once — logs in and captures session | _writes_ `storage/auth/user.json` |
| `authenticated`   | All non-login specs                              | _reads_ persisted session    |
| `unauthenticated` | Login specs only                                 | fresh, isolated session      |

Run a single project:

```bash
npx playwright test --project=setup-auth
npx playwright test --project=authenticated
npx playwright test --project=unauthenticated
```

Or just `npx playwright test` and Playwright resolves dependencies automatically.

---

## NPM Scripts

| Script                       | What it does                                              |
| ---------------------------- | --------------------------------------------------------- |
| `npm test`                   | Run the entire suite                                      |
| `npm run test:smoke`         | `@smoke` only — fast critical-path feedback               |
| `npm run test:regression`    | `@regression` only — broader coverage                     |
| `npm run test:critical`      | `@critical` business scenarios                            |
| `npm run test:negative`      | Negative-path tests                                       |
| `npm run test:rbac`          | Role-based access checks                                  |
| `npm run test:headed`        | Headed browser                                            |
| `npm run test:ui`            | Playwright UI mode                                        |
| `npm run test:debug`         | Inspector mode                                            |
| `npm run report`             | Open the last Playwright HTML report                      |
| `npm run allure:report`      | Generate + open the Allure report                         |
| `npm run typecheck`          | `tsc --noEmit` — validate TypeScript without emitting    |
| `npm run clean`              | Remove generated artefacts (`test-results`, `allure-*`, …) |

---

## Tagging Strategy

Every test carries at least one tag so suites can be sliced freely:

| Tag           | Purpose                                                |
| ------------- | ------------------------------------------------------ |
| `@smoke`      | Fast, high-value checks — runs on every PR             |
| `@regression` | Broader coverage — runs on `master` and nightly        |
| `@critical`   | Business-critical scenarios                            |
| `@negative`   | Negative-path / error-handling                         |
| `@validation` | Form-validation scenarios                              |
| `@rbac`       | Role-based access control                              |

Combine via Playwright `--grep`:

```bash
npx playwright test --grep "@smoke|@critical"
npx playwright test --grep-invert @negative
```

---

## Role-Based Fixtures

Tests express **intent**, not low-level steps:

```ts
import { test } from '@lib/fixtures';
import { USER_ROLES } from '@lib/data/constants/roles';

test('user can log in', async ({ loginAs, page }) => {
    await loginAs(USER_ROLES.USER);
    // assertions...
});
```

Available fixtures:

- `loginPage`, `dashboardPage` — ready-to-use page objects
- `loginAs(role)` — programmatic login for any `USER_ROLES.*`
- `userPage`, `adminPage` — `DashboardPage` pre-authenticated as that role

Credentials are sourced from `.env` via `config/env.ts` → `lib/data/users.ts`.
**Specs never touch `process.env` directly.**

---

## Sample Tests

### ✅ Positive — happy path

```ts
test(
    'USER-001: User logs in with valid credentials',
    { tag: ['@smoke', '@regression', '@critical'] },
    async ({ loginAs, page }) => {
        await loginAs(USER_ROLES.USER);
        const dashboard = new DashboardPage(page);
        await dashboard.verifyDashboardLoaded();
    },
);
```

### ❌ Negative — invalid credentials

```ts
test(
    'AUTH-101: Login fails with invalid username',
    { tag: ['@regression', '@negative'] },
    async ({ loginPage }) => {
        await loginPage.openLoginPage();
        await loginPage.login('InvalidUser', 'admin123');
        await loginPage.verifyErrorMessage(MESSAGES.LOGIN_FAILED);
    },
);
```

### 🛡️ Role-based — admin dashboard

```ts
test(
    'DASH-101: Admin can access dashboard',
    { tag: ['@smoke', '@regression'] },
    async ({ adminPage }) => {
        await adminPage.verifyDashboardLoaded();
    },
);
```

---

## Reporting

| Tool            | Location               | Open it with                              |
| --------------- | ---------------------- | ----------------------------------------- |
| Playwright HTML | `playwright-report/`   | `npm run report` (or `npx playwright show-report`) |
| Allure          | `allure-results/`      | `npm run allure:report`                   |
| JUnit XML       | `test-results/results.xml` | Consumed by CI dashboards             |
| JSON            | `test-results/results.json` | Used by the regression workflow summary |

On failure, Playwright also stores screenshots, videos, and traces under
`test-results/`. Drop the trace into [trace.playwright.dev](https://trace.playwright.dev)
for a step-by-step viewer.

---

## Continuous Integration

GitHub Actions workflows live under [`.github/workflows/`](.github/workflows):

| Workflow            | Trigger                                                                  | Purpose                                   |
| ------------------- | ------------------------------------------------------------------------ | ----------------------------------------- |
| **`smoke.yml`**     | PR / manual                                                              | Fast `@smoke` validation                   |
| **`regression.yml`**| push to `master` / nightly cron / manual                                 | `@regression`, sharded ×2, combined Allure |
| **`codeql.yml`**    | push / PR / weekly cron                                                  | Static security analysis                   |

CI features include browser caching, retries, sharding, combined Allure
reporting, and a Markdown step summary. Configure secrets under
**Settings → Secrets and variables → Actions** when targeting a private
environment; demo defaults are used otherwise.

---

## Documentation

| Doc                                       | When to read it                              |
| ----------------------------------------- | -------------------------------------------- |
| [Quick Start](docs/quick-start.md)        | First time on the project                    |
| [Setup Guide](docs/setup-guide.md)        | Detailed environment configuration           |
| [Architecture](docs/architecture.md)      | Understanding how the layers fit together    |
| [Test Coverage](docs/test-coverage.md)    | What is tested, which tags map to which IDs  |
| [Runbook](docs/runbook.md)                | Picking the right command for a scenario     |
| [Troubleshooting](docs/troubleshooting.md)| A test failed or the suite won't start       |
| [CHANGELOG](CHANGELOG.md)                 | Release notes                                |

---

## Contributing

We welcome issues, ideas, and pull requests! Read
[`CONTRIBUTING.md`](CONTRIBUTING.md) for the development workflow, coding
standards, and Conventional Commits convention. By participating you agree to
the [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Security

Please report vulnerabilities privately via
[GitHub Security Advisories](https://github.com/aeshamangukiya/playwright-test-automation-framework/security/advisories/new).
Full disclosure policy in [`SECURITY.md`](SECURITY.md).

---

## License

Released under the [MIT License](LICENSE).

> The OrangeHRM trademark and its open-source demo are property of their
> respective owners. This repository is an independent test automation
> reference and is not affiliated with or endorsed by OrangeHRM Inc.

<p align="center"><sub>Built with ❤️ for the QA engineering community.</sub></p>
