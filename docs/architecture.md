## Architecture Overview

This framework is a **modular, enterprise-style Playwright test automation framework** built around:

- **Config-driven environments** (`config/`)
- **Page Object Model (POM)** (`lib/pages/`)
- **Role-based fixtures** (`lib/fixtures/`)
- **Centralized test data & constants** (`lib/data/`)
- **Focused helpers & utilities** (`lib/helpers/`, `lib/utils/`)
- **Behaviour-driven spec layout** (`specs/features/`, `specs/setup/`)

The design keeps **test intent** in the `specs/` layer and pushes **implementation details** down into pages, fixtures, and utilities.

---

## Folder Structure

```text
config/
  env.ts          # ENV + users from .env
  browser.ts      # Timeouts, viewport, browser defaults
  urls.ts         # Application route fragments

lib/
  pages/          # Page Objects (Base, Auth, Dashboard)
  fixtures/       # test + role-based fixtures (loginAs, userPage, adminPage)
  helpers/        # AssertionHelper (business assertions)
  utils/          # Logger, Wait, DataGenerator
  data/
    users.ts      # ENV-driven user map
    constants/    # roles, messages, app-constants, ui-constants

specs/
  features/       # Business-facing tests (auth, dashboard, ...)
  setup/          # One-time auth setup (storage state)
```

This structure is intentionally **flat and predictable** so that new engineers can quickly discover where a given responsibility lives.

---

## Key Components

### Config Layer (`config/`)

- **`env.ts`**
  - Single entry point for environment-specific values.
  - Reads from `.env` via `dotenv`.
  - Exposes `ENV.BASE_URL` and `ENV.USERS` (USER/ADMIN) to the rest of the framework.
  - All environment-sensitive code should depend on this module, **not** on `process.env` directly.

- **`browser.ts`**
  - Central definitions for timeouts and viewport presets.
  - Consumed by `playwright.config.ts` to keep config in one place.

- **`urls.ts`**
  - Contains **relative route fragments** such as `LOGIN`, `DASHBOARD`, `PIM`, `LEAVE`.
  - Combined with `ENV.BASE_URL` to build full URLs.
  - Prevents hardcoded paths scattered across pages and specs.

---

### Page Objects (`lib/pages/`)

- **`BasePage`**
  - Wraps Playwright `Page` with **stable enterprise primitives**:
    - `goto()` with consistent navigation semantics.
    - `click()` with visibility wait.
    - `stableFill()` with keyboard-based clear and `toHaveValue` assertion.
    - `expectVisible()` convenience wrapper around `expect(locator).toBeVisible()`.
  - All concrete page classes extend `BasePage` to get consistent interaction patterns.

- **`LoginPage`**
  - Encapsulates login form locators & actions.
  - Uses `ENV.BASE_URL` to open the login page (no hardcoded host).
  - Exposes `openLoginPage()` and `login(username, password)` actions.

- **`DashboardPage`**
  - Encapsulates dashboard behaviour:
    - `verifyDashboardLoaded()` – validates URL via `AssertionHelper` and logs via `Logger`.
    - `verifyAssignLeaveVisible()` – asserts that the **Assign Leave** menu option is visible.
  - Uses `URLS` and `UI_CONSTANTS` instead of inline strings where appropriate.

---

### Fixtures (`lib/fixtures/`)

The fixtures layer is the **primary integration point** for tests:

- Extends Playwright `test` with:
  - `loginPage`, `dashboardPage` – ready-to-use Page Objects.
  - `loginAs(role)` – reusable role-based login action.
  - `userPage`, `adminPage` – automatically logged-in dashboard instances for `USER` and `ADMIN`.

Benefits:

- Tests express **intent** (`loginAs(USER_ROLES.USER)`) rather than low-level steps.
- Login logic is maintained in **one place** and reused across:
  - Specs (e.g. `login.spec.ts`)
  - Setup (`auth.setup.ts` for storage state)

---

### Data & Constants (`lib/data/`)

- **`users.ts`**
  - Binds user roles to environment-driven credentials from `ENV`.
  - Prevents direct `.env` access anywhere else in the codebase.

- **`constants/roles.ts`**
  - Defines `USER_ROLES` as a **constant object** (not an enum) for better typing and flexibility.
  - Used across fixtures and specs.

- **`constants/messages.ts`, `constants/ui-constants.ts`, `constants/app-constants.ts`**
  - Collect UI labels, user-facing messages, and global test constants.
  - `APP_CONSTANTS` includes:
    - `TEST_PREFIX` used by `DataGenerator`.
    - Shared timeout buckets.
    - Example role permissions metadata for future authorization assertions.

- **`utils/DataGenerator.ts`**
  - Centralized random data creation following an **enterprise naming convention**:
    - Pattern: `PW_{Entity}_{UniqueIdentifier}`
  - Provides helpers such as `user()`, `email()`, `entityName()`, `title()`, `number()`, `date()`.
  - Intended usage:
    - Create stable but unique business entities in future feature specs (PIM records, leave requests, etc.).

---

### Helpers & Utils

- **`helpers/AssertionHelper.ts`**
  - Houses **business-level assertions** that build on Playwright’s `expect`.
  - Example: `urlContains(page, URLS.DASHBOARD)` for consistent URL checks.
  - Does **not** replace `expect` – tests are still free to use raw Playwright assertions where appropriate.

- **`utils/Logger.ts`**
  - Central logging with clear log levels (`info`, `debug`, `warn`, `error`, `success`, `step`, `assertion`, `api`, `navigation`).
  - Provides timestamped and levelled output for **CI-friendly diagnostics**.

- **`utils/Wait.ts`**
  - Encapsulates explicit waiting patterns:
    - Page-level (`forNetworkIdle`, `forDomContentLoaded`, `forPageLoad`, `forURL`)
    - Locator-level (`forVisible`, `forHidden`, `forDetached`, `forEnabled`, `forDisabled`, `forText`, `forCount`)
    - Utility (`until`, `pause`)
  - Helps avoid ad-hoc sleeps and promotes explicit, reusable synchronization patterns.

---

### Specs & Setup (`specs/`)

- **`specs/setup/auth.setup.ts`**
  - Logs in once using the shared `loginAs` fixture.
  - Verifies dashboard load.
  - Persists storage state to `APP_CONSTANTS.STORAGE_PATH` for reuse across projects.

- **`specs/features/...`**
  - Contain business-readable scenarios, e.g.:
    - `auth/login.spec.ts`
    - `dashboard/dashboard.spec.ts`
  - Use:
    - Tags (`@smoke`, `@regression`, `@critical`) for selective runs.
    - Role-based fixtures and page objects for concise tests.

---

## Enterprise Design Principles

This framework adheres to several enterprise automation principles:

- **Single Source of Truth**
  - All environment-related values live in `config/env.ts` + `.env`.
  - All URLs live in `config/urls.ts`.
  - All role/user mappings live in `lib/data/`.

- **Separation of Concerns**
  - **Specs** describe **behaviour** and business intent.
  - **Pages** encapsulate UI structure and interactions.
  - **Fixtures** coordinate authentication and role context.
  - **Helpers/Utils** provide shared cross-cutting concerns (logging, waits, data).

- **No Hardcoded URLs in Tests**
  - Tests rely on `ENV.BASE_URL` + `URLS.*`.
  - Swapping environments is done purely via `.env` without touching code.

- **Role-Based Access Testing**
  - Roles are explicit (`USER_ROLES`).
  - Fixtures provide logged-in contexts per role (`userPage`, `adminPage`) to prepare for richer RBAC coverage.

- **CI/CD Ready**
  - `playwright.config.ts` is projectized (`prepare-auth`, `after-login`, `before-login`).
  - Reports and artifacts (HTML + Allure) are generated under standard folders for archiving.
  - `.gitignore` ensures artifacts and env files are not committed.

---

## Extension Points

When extending the framework:

- **New Feature / Module**
  - Create a new Page Object in `lib/pages/<feature>/`.
  - Add any new routes to `config/urls.ts`.
  - Add new specs under `specs/features/<feature>/`.

- **New Role**
  - Extend `USER_ROLES` and `APP_CONSTANTS.ROLE_PERMISSIONS` as needed.
  - Add corresponding credentials in `.env` and surface them via `config/env.ts` → `lib/data/users.ts`.
  - Optionally add a new fixture (e.g. `managerPage`) in `lib/fixtures/index.ts`.

- **Additional Environments**
  - Add more keys in `.env` (e.g. `QA_*`) and extend `ENV_CONFIG` in `config/env.ts` if needed.

