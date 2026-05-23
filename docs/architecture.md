# 🏗️ Architecture

This document explains how the framework is layered, what each layer is
responsible for, and the design principles that keep it maintainable.

> 🎯 The guiding principle: **intent in specs, implementation in pages and
> helpers, configuration in `.env` and `config/`.**

---

## Layered overview

```
┌─────────────────────────────────────────────┐
│  specs/                                     │  ← business intent
│  └ features/<module>/*.spec.ts              │
│  └ setup/*.setup.ts                         │
├─────────────────────────────────────────────┤
│  lib/fixtures                               │  ← composition (test + auth)
├─────────────────────────────────────────────┤
│  lib/pages          lib/helpers             │  ← UI structure  · business assertions
├─────────────────────────────────────────────┤
│  lib/utils          lib/data                │  ← logging, waits, generators, constants
├─────────────────────────────────────────────┤
│  config/                                    │  ← env, urls, browser, timeouts
└─────────────────────────────────────────────┘
```

Every layer depends only on layers below it — never upward, never sideways
into a sibling feature. This keeps changes localised and refactors safe.

---

## Folder map

```text
config/
  env.ts          # Strict .env loader: ENVIRONMENT + base URL + users
  browser.ts      # Viewport, action / navigation / expect / test timeouts
  urls.ts         # Application route fragments

lib/
  data/
    users.ts                  # ENV-driven user map
    constants/
      roles.ts                # USER_ROLES (constant object + type)
      messages.ts             # User-facing strings (alerts, toasts)
      ui-constants.ts         # Labels, buttons, menu options
      app-constants.ts        # Storage path, timeouts, role permissions

  fixtures/
    base.fixture.ts           # loginPage, dashboardPage (page objects only)
    auth.fixture.ts           # loginAs(role), userPage, adminPage
    index.ts                  # mergeTests entry point

  helpers/
    AssertionHelper.ts        # Business assertions (URL, role visibility, …)

  pages/
    base/BasePage.ts          # goto, click, stableFill, expectVisible
    auth/LoginPage.ts
    dashboard/DashboardPage.ts

  utils/
    Logger.ts                 # Timestamped, level-tagged console logging
    Wait.ts                   # Explicit waits (URL, visible, hidden, until)
    DataGenerator.ts          # PW_{Entity}_{UniqueId} pattern

specs/
  setup/auth.setup.ts         # One-time login; persists storage state
  features/auth/login.spec.ts
  features/dashboard/dashboard.spec.ts
```

---

## Layer responsibilities

### `config/`

| File         | Responsibility                                                        |
| ------------ | --------------------------------------------------------------------- |
| `env.ts`     | Strict reader for `.env` — fails fast on missing required values      |
| `browser.ts` | Centralised viewport and timeout constants                            |
| `urls.ts`    | Application route fragments (combined with `ENV.BASE_URL` at runtime) |

**Rule:** Nothing outside `env.ts` reads `process.env`. If you need a new
environment variable, add it to `env.ts` and re-export it through the `ENV`
constant.

---

### `lib/pages/`

Page Objects encapsulate the **structure and interactions** of a single screen.

- **`BasePage`** provides safe primitives every concrete page reuses:
    - `goto(url)` — navigates with `domcontentloaded` semantics
    - `click(locator)` — waits for visibility before clicking
    - `stableFill(locator, value)` — clears via real keyboard input, types
      sequentially, then asserts `toHaveValue` to prevent silent failures
    - `expectVisible` / `expectText` — thin wrappers over Playwright `expect`
- **Concrete pages** (`LoginPage`, `DashboardPage`) declare locators as
  `readonly` fields and expose `async` actions / verifications.

**Rule:** Page objects don't know about test data or env variables — they
receive everything as arguments.

---

### `lib/fixtures/`

The fixtures layer is the **single integration point** between specs and the
underlying page objects. It is split into two files:

| File                | Provides                                                              |
| ------------------- | --------------------------------------------------------------------- |
| `base.fixture.ts`   | `loginPage`, `dashboardPage` — page objects bound to the active page  |
| `auth.fixture.ts`   | `loginAs(role)`, `userPage`, `adminPage` — authenticated contexts     |
| `index.ts`          | Merges both fixtures into a single `test` export                       |

A spec only ever imports from `index.ts`:

```ts
import { test, expect } from '../../lib/fixtures';
```

**Why split?** Because adding new feature fixtures (e.g. `paymentPage`)
shouldn't touch the auth fixture, and adding new authentication flows
shouldn't touch the base fixture.

---

### `lib/helpers/`

Cross-cutting **business assertions** that build on Playwright's `expect`.

- `AssertionHelper.urlContains(page, partial)` — used by `DashboardPage`
  to verify dashboard navigation.

Helpers don't hold locators (that's the page object's job) and don't depend
on env values (that's `config/`'s job). They glue the two together at the
business-assertion level.

---

### `lib/utils/`

| File              | Purpose                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| `Logger.ts`       | Timestamped console logging with levels: `info`, `debug`, `warn`, `error`, `success`, `step`, `assertion`, `api`, `navigation` |
| `Wait.ts`         | Explicit waits — replaces ad-hoc `waitForTimeout` calls                  |
| `DataGenerator.ts`| `PW_{Entity}_{UniqueId}` naming for unique test data                     |

`Wait.pause(page, ms)` is the **only** place where a fixed timeout is allowed,
and even then only outside CI (it short-circuits when `process.env.CI` is set).

---

### `lib/data/`

| File                            | Purpose                                                          |
| ------------------------------- | ---------------------------------------------------------------- |
| `users.ts`                      | Maps `USER_ROLES.USER` / `.ADMIN` to credentials from `ENV.USERS` |
| `constants/roles.ts`            | `USER_ROLES` constant object + `UserRole` union type              |
| `constants/messages.ts`         | User-facing copy (login failure, required field, success)         |
| `constants/ui-constants.ts`     | Labels, buttons, menu options                                     |
| `constants/app-constants.ts`    | `TEST_PREFIX`, `STORAGE_PATH`, timeout buckets, role permissions  |

---

### `specs/`

| Folder      | Contents                                                              |
| ----------- | --------------------------------------------------------------------- |
| `setup/`    | One-off setup specs (`*.setup.ts`) — run by the `setup-auth` project  |
| `features/` | Business-readable specs grouped by module (`auth`, `dashboard`, …)    |

Each test must:

1. Carry at least one tag (`@smoke`, `@regression`, …).
2. Use a `TEST-ID:` prefix in the title for traceability.
3. Use fixtures from `lib/fixtures` instead of manual login plumbing.

---

## Playwright projects

`playwright.config.ts` declares three projects with explicit dependencies so a
single `npx playwright test` invocation resolves the full order automatically:

| Project           | Pattern                  | Storage state             | Purpose                                     |
| ----------------- | ------------------------ | ------------------------- | ------------------------------------------- |
| `setup-auth`      | `*.setup.ts`             | _writes_ `storage/auth/user.json` | Logs in once, captures session              |
| `authenticated`   | All non-login specs      | _reads_ persisted session | Authenticated feature specs                  |
| `unauthenticated` | `*login.spec.ts`         | none                      | Fresh-session login & validation tests       |

Dependency chain:

```
setup-auth  ─►  authenticated
unauthenticated   (independent — fresh session)
```

---

## Reporting pipeline

Playwright is configured with multiple reporters in parallel:

| Reporter            | Output                       | Used by                                |
| ------------------- | ---------------------------- | -------------------------------------- |
| `list`              | stdout                       | Human + CI logs                        |
| `html`              | `playwright-report/`         | `npm run report`                       |
| `allure-playwright` | `allure-results/`            | `npm run allure:report`, CI artifact   |
| `junit`             | `test-results/results.xml`   | External CI dashboards                 |
| `json`              | `test-results/results.json`  | Regression workflow step summary       |

Screenshots, videos, and traces are captured **only on failure** to keep
artefact size small.

---

## Quality gates

| Gate               | Tool                              | Trigger                       |
| ------------------ | --------------------------------- | ----------------------------- |
| Type safety        | TypeScript strict mode            | `npm run typecheck` (local + CI) |
| Security           | CodeQL                            | `codeql.yml` (push/PR/weekly) |
| Dependency hygiene | Dependabot (npm + GitHub Actions) | Weekly                        |

---

## Design principles

1. **Single source of truth.** Environment values live in `.env` → `config/env.ts`.
   URLs live in `config/urls.ts`. Test data lives in `lib/data/`.
2. **Separation of concerns.** Specs describe behaviour. Pages encapsulate UI.
   Fixtures coordinate auth. Utils handle cross-cutting concerns.
3. **Fail fast.** `config/env.ts` throws on missing variables so issues surface
   at startup, not mid-suite.
4. **No magic strings.** Every label, message, or URL is referenced through a
   constant or via `URLS` / `MESSAGES` / `UI_CONSTANTS`.
5. **Tests express intent.** A spec reads like a business scenario, with low-level
   plumbing delegated to fixtures.
6. **Stability over speed.** `stableFill` enforces `toHaveValue`; `Wait.*` waits on
   real conditions instead of fixed sleeps.

---

## Extending the framework

| Task                  | Where to change                                                           |
| --------------------- | ------------------------------------------------------------------------- |
| New module / page     | Add `lib/pages/<module>/<Page>.ts`, add route to `config/urls.ts`         |
| New role              | Extend `USER_ROLES` + credentials in `.env` + map in `lib/data/users.ts`  |
| New environment       | Add `<NAME>_*` vars in `.env` and update `VALID_ENVIRONMENTS` in `env.ts` |
| New fixture           | Add to `auth.fixture.ts` (auth-aware) or create a new `*.fixture.ts`     |
| New shared assertion  | Add to `lib/helpers/AssertionHelper.ts`                                   |

See [CONTRIBUTING → Coding Standards](../CONTRIBUTING.md#coding-standards) for naming rules and PR expectations.
