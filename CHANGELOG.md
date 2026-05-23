# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

- **Enterprise governance**: `LICENSE` (MIT), `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`,
  `SECURITY.md`, `.github/CODEOWNERS`, PR template, and YAML-form issue templates
  (bug + feature).
- **CI/CD overhaul**: split into focused workflows — `smoke.yml`,
  sharded `regression.yml` with combined Allure summary, and `codeql.yml`
  for static security analysis.
- **Dependabot**: weekly npm + GitHub Actions updates with grouped PRs.
- **Documentation**: rewritten `README.md` with badges + TOC, plus new
  `docs/runbook.md` and `docs/troubleshooting.md`; refreshed
  `docs/quick-start.md`, `docs/setup-guide.md`, `docs/architecture.md`,
  `docs/test-coverage.md`.
- **Reporters**: added JUnit XML and JSON for CI tooling; Allure remains
  the primary rich report.

### Changed

- **`config/env.ts`**: strict loader — fails fast on missing variables,
  validates `ENVIRONMENT` against an allow-list, exposes flat + nested
  access.
- **`config/browser.ts`**: added `EXPECT` timeout bucket and aligned other
  timeouts with Playwright defaults.
- **`lib/fixtures/`**: split into `base.fixture.ts` (page objects) and
  `auth.fixture.ts` (role-based authentication), merged through `index.ts`.
- **`playwright.config.ts`**: cleaner project layout (`setup-auth`,
  `authenticated`, `unauthenticated`); enabled `fullyParallel`,
  `forbidOnly` in CI, and added JUnit + JSON reporters.
- **`specs/setup/auth.setup.ts`**: now creates the storage directory if
  missing and persists session to `storage/auth/user.json`.
- **`tsconfig.json`**: targets ES2022, stricter compiler options, explicit
  `include` / `exclude`, retained path aliases (`@config`, `@lib`, `@specs`).
- **`package.json`**: full metadata (license, author, repository, bugs,
  homepage, engines), expanded test scripts (`test:critical`, `test:negative`,
  `test:rbac`, `test:ui`, `test:debug`, `typecheck`).
- **`.gitignore`**: tightened to exclude all artefacts and tooling caches;
  `.gitattributes` enforces LF endings cross-platform.

### Security

- `.env` is now strictly git-ignored. `SECURITY.md` documents the private
  disclosure process via GitHub Security Advisories.

---

## [1.0.0] – 2026-02-17

### Added

- Initial production-ready release.
- 19 test cases across authentication and dashboard features
  (positive, negative, validation, RBAC).
- Page Object Model with `BasePage` providing stable primitives.
- Role-based fixtures (`loginAs`, `userPage`, `adminPage`).
- Storage-state reuse via `setup-auth` Playwright project.
- Allure + Playwright HTML reporting.
- Initial GitHub Actions workflow for smoke + regression.
