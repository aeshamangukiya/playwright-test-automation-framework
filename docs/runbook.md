# 📓 Runbook

Pick the right command for the scenario. This is the page to skim when you
already know _what_ you want to do but not _how_.

> 🎯 Reference [Quick Start](quick-start.md) for first-time setup,
> [Architecture](architecture.md) for design, and
> [Troubleshooting](troubleshooting.md) when something is broken.

---

## Daily workflows

| Goal                                              | Command                          |
| ------------------------------------------------- | -------------------------------- |
| Fast feedback before pushing                      | `npm run test:smoke`             |
| Full local validation                             | `npm test`                       |
| Type-check (no emit)                              | `npm run typecheck`              |
| Wipe generated artefacts                          | `npm run clean`                  |

---

## Targeted test runs

### By tag

```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
npx playwright test --grep @critical
npx playwright test --grep @negative
npx playwright test --grep @validation
npx playwright test --grep @rbac

# Multiple tags (OR)
npx playwright test --grep "@smoke|@critical"

# Exclude a tag
npx playwright test --grep-invert @negative
```

### By Test ID prefix

```bash
# All login tests
npx playwright test --grep "AUTH-"

# Only the AUTH-1xx series (negative + validation)
npx playwright test --grep "AUTH-1"

# A specific test
npx playwright test --grep "USER-001"
```

### By file or folder

```bash
npx playwright test specs/features/auth/login.spec.ts
npx playwright test specs/features/dashboard/
```

### By Playwright project

```bash
npx playwright test --project=setup-auth
npx playwright test --project=authenticated
npx playwright test --project=unauthenticated
```

---

## Modes

| Mode                | Command                       | When to use                                   |
| ------------------- | ----------------------------- | --------------------------------------------- |
| Default headless    | `npm test`                    | CI / regular local runs                       |
| Headed              | `npm run test:headed`         | Watch the browser drive                       |
| Playwright UI       | `npm run test:ui`             | Step through tests interactively              |
| Debug (Inspector)   | `npm run test:debug`          | Pause + inspect locators                      |
| Single browser arg  | `npx playwright test --headed --workers=1` | Reduce parallelism while debugging    |

---

## Reporting

| Goal                                | Command                          |
| ----------------------------------- | -------------------------------- |
| Open the last Playwright HTML report| `npm run report`                 |
| Generate Allure                     | `npm run allure:generate`        |
| Open Allure                         | `npm run allure:open`            |
| Generate **and** open Allure        | `npm run allure:report`          |
| Investigate a failure trace         | Upload `test-results/.../trace.zip` to <https://trace.playwright.dev> |

---

## Environment switching

```bash
# Staging (default)
ENVIRONMENT=staging npm test

# Production (must have PRODUCTION_* values set in .env)
ENVIRONMENT=production npm test
```

If `ENVIRONMENT` is missing or invalid, `config/env.ts` throws immediately.

---

## CI / GitHub Actions

| Workflow         | Trigger                              | Manual run                                                |
| ---------------- | ------------------------------------ | --------------------------------------------------------- |
| `smoke.yml`      | PR                                   | Actions → **Smoke Tests** → choose environment             |
| `regression.yml` | push to `master` / nightly cron      | Actions → **Regression Tests** → choose environment        |
| `codeql.yml`     | push / PR / weekly cron              | Actions → **CodeQL** → _Run workflow_                      |

Manual triggers accept `staging` or `production` from a dropdown.

---

## Git workflow

```bash
# Start a branch
git checkout -b feat/<short-description>

# Commit (Conventional Commits recommended)
git commit -m "feat(auth): add retry on transient 401"

# Push and open a PR
git push -u origin HEAD
gh pr create --fill
```

> Conventional Commits style is recommended for readable history, but it is
> not enforced via hooks.

---

## Maintenance

| Task                                | Command                                                |
| ----------------------------------- | ------------------------------------------------------ |
| Update Playwright + browsers        | `npm i -D @playwright/test@latest && npx playwright install --with-deps` |
| Refresh storage state               | `npm run clean && npx playwright test --project=setup-auth` |
| Bump all minor / patch dependencies | Wait for the Dependabot PR or `npm update`             |
