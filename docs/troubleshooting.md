# 🆘 Troubleshooting

Common problems, root causes, and fixes. If your issue isn't here, please
[open a bug report](https://github.com/aeshamangukiya/playwright-test-automation-framework/issues/new/choose).

---

## Setup

### `Missing required environment variable: STAGING_BASE_URL`

**Cause:** `.env` is missing or doesn't contain values for the active
`ENVIRONMENT` prefix.

**Fix:**

```bash
cp .env.example .env
# Then edit .env if you need non-default values
```

If you're targeting production, ensure every `PRODUCTION_*` variable is set.

---

### `Invalid ENVIRONMENT: "<value>"`

**Cause:** `ENVIRONMENT` in `.env` is not one of `staging` / `production`.

**Fix:** Set `ENVIRONMENT=staging` (or `production`) in `.env`.

---

### `Executable doesn't exist at /.../chromium/chrome`

**Cause:** Playwright browsers weren't installed.

**Fix:**

```bash
npx playwright install --with-deps chromium
```

On Linux runners, you may need `--with-deps` to also install OS libraries.

---

## Running tests

### Tests time out reaching `opensource-demo.orangehrmlive.com`

**Cause:** No internet access or the demo target is temporarily down.

**Fix:** Verify connectivity with `curl -I https://opensource-demo.orangehrmlive.com`.
If the site is down, retry later or point at your own OrangeHRM instance via
`STAGING_BASE_URL`.

---

### `storage/auth/user.json` not found

**Cause:** The `setup-auth` project hasn't run yet (e.g. you launched the
`authenticated` project in isolation).

**Fix:**

```bash
npx playwright test --project=setup-auth
# or just:
npx playwright test
```

Playwright will resolve the dependency chain automatically.

---

### `Element not visible` / flaky locator

**Cause:** UI animation, slow API response, or an unstable selector.

**Fixes (in order):**

1. Confirm the locator with `npx playwright codegen <url>`.
2. Use `Wait.forVisible(locator)` / `Wait.forURL(...)` instead of fixed sleeps.
3. Prefer role-based locators (`getByRole('button', { name: 'Login' })`) over
   CSS chains.
4. If the element is inside a slow widget, increase that specific assertion's
   timeout — never globally.

---

### Flaky on CI, passes locally

**Cause #1: Different viewport.** CI uses headless 1440×900 by default;
some UI elements collapse below specific widths.
→ Reproduce locally with `npm run test:headed`.

**Cause #2: Race with auth setup.** Specs ran before `setup-auth` finished.
→ Don't pass `--project=authenticated` in isolation; let Playwright resolve
dependencies.

**Cause #3: Network jitter.** OrangeHRM demo can be slow.
→ Use `Wait.*` helpers and the per-call `timeout` option; avoid global bumps.

---

## Reporting

### `npm run allure:open` says `Java not found`

**Cause:** Allure's CLI requires a Java runtime.

**Fix:** Install Java 8+ (e.g. Temurin, Oracle, Zulu) and re-run.

---

### Allure report is empty after a run

**Cause:** Tests ran but `allure-results/` was wiped before generation.

**Fix:** Don't call `npm run clean` between the test run and
`allure:generate`. Inside CI, the `regression` workflow merges per-shard
results before generating the combined report.

---

## CI

### Workflow fails with `npm ci can only install packages…`

**Cause:** `package-lock.json` is out of sync with `package.json`.

**Fix:**

```bash
npm install
git add package-lock.json
git commit -m "chore: refresh package-lock"
```

---

### `playwright-cache` always misses

**Cause:** `package-lock.json` changed (any dependency bump invalidates the
key, by design).

This is expected — caches refresh whenever the lockfile changes. The
workflow falls back to `npx playwright install --with-deps`, which is slower
but always correct.

---

### CodeQL job fails with `No source code found`

**Cause:** Default-branch protection prevented the checkout from running.

**Fix:** Ensure **Settings → Actions → General** allows `contents: read` for
GitHub Actions on the repo.

---

## Need more help?

- Search [open issues](https://github.com/aeshamangukiya/playwright-test-automation-framework/issues).
- Ask in [Discussions](https://github.com/aeshamangukiya/playwright-test-automation-framework/discussions).
- File a bug using the [Bug Report template](https://github.com/aeshamangukiya/playwright-test-automation-framework/issues/new?template=bug_report.yml).
