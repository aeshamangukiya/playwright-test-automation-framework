# Contributing Guide

First off — thank you for considering a contribution! This project exists as a
reference implementation for production-grade Playwright test automation, so
quality, clarity, and reproducibility matter more than raw feature volume.

Please take a moment to read this document before opening an issue or PR.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Ways to Contribute](#ways-to-contribute)
3. [Getting Started](#getting-started)
4. [Development Workflow](#development-workflow)
5. [Coding Standards](#coding-standards)
6. [Commit Messages](#commit-messages)
7. [Branching & Pull Requests](#branching--pull-requests)
8. [Adding New Tests](#adding-new-tests)
9. [Reporting Bugs](#reporting-bugs)
10. [Suggesting Enhancements](#suggesting-enhancements)
11. [Security Issues](#security-issues)

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md).
By participating, you agree to uphold its terms.

---

## Ways to Contribute

- **🐛 Bug reports** — open an issue using the bug template.
- **✨ Feature ideas** — open an issue using the feature template.
- **📝 Documentation** — typo fixes and clarifications are very welcome.
- **🧪 New tests** — extending coverage of OrangeHRM modules (PIM, Leave, Time, etc.).
- **🛠️ Framework improvements** — fixtures, helpers, CI/CD, reporting.

---

## Getting Started

```bash
# 1) Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/playwright-test-automation-framework.git
cd playwright-test-automation-framework

# 2) Install dependencies (Node 20+ required)
npm install
npx playwright install --with-deps chromium

# 3) Configure environment
cp .env.example .env   # or `copy .env.example .env` on Windows
```

See the [Quick Start guide](docs/quick-start.md) for a full walkthrough.

---

## Development Workflow

```bash
# Run the full suite locally
npm test

# Fast smoke-only feedback
npm run test:smoke

# Validate TypeScript compiles cleanly before pushing
npm run typecheck
```

Reports:

- **Playwright HTML** — `npm run report` or `npx playwright show-report`
- **Allure** — `npm run allure:report`

---

## Coding Standards

| Topic         | Rule                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------- |
| Language      | TypeScript (strict mode)                                                                 |
| Folders       | kebab-case (`specs/features`, `lib/pages`)                                               |
| Files (class) | PascalCase (`LoginPage.ts`, `DashboardPage.ts`)                                          |
| Files (spec)  | kebab-case + `.spec.ts` (`login.spec.ts`)                                                |
| Symbols       | camelCase for methods/vars, PascalCase for types, UPPER_SNAKE for constants              |
| URLs          | Centralised in `config/urls.ts` — never inline them in pages or specs                    |
| Selectors     | Prefer `getByRole`, `getByLabel`, `getByText`. Avoid CSS chains and `nth-child` indexes. |
| Env access    | Always through `config/env.ts` — never read `process.env` directly outside that module   |

### Page Object Model

- Page objects encapsulate **structure + actions** of a single screen.
- They extend `BasePage` to inherit stable primitives (`stableFill`, `click`, `expectVisible`).
- Business assertions belong in `lib/helpers/AssertionHelper.ts`, not in the page itself.

### Tests

- Tag every spec with at least `@smoke` or `@regression`.
- Use a `TEST-ID:` prefix in titles (e.g. `AUTH-101: Login fails with invalid username`).
- Prefer fixtures (`loginAs`, `userPage`, `adminPage`) over manual login steps.
- No hard sleeps — use `lib/utils/Wait.ts` helpers or Playwright's auto-waiting.

---

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) style
to keep history scannable and changelog-friendly. It is **recommended but not enforced** —
no git hook will block your commit.

Format:

```
<type>(<optional scope>): <short summary>
```

Common types: `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `ci`, `chore`.

Examples:

```
feat(auth): add retry on transient 401
fix(dashboard): correct Assign Leave locator on viewport <1280
docs(readme): add badges and TOC
test(pim): add employee CRUD coverage
ci(workflows): split smoke and regression jobs
```

---

## Branching & Pull Requests

1. Create a topic branch from `master`:
    ```bash
    git checkout -b feat/<short-description>
    ```
2. Make your changes and run the local smoke tests:
    ```bash
    npm run typecheck
    npm run test:smoke
    ```
3. Push and open a PR using the provided template.
4. Make sure CI is green before requesting review.

A PR should:

- Be focused (one logical change per PR).
- Include or update tests when behaviour changes.
- Update documentation when public-facing APIs change.

---

## Adding New Tests

```
specs/features/<module>/<feature>.spec.ts
```

Checklist for a new spec:

- [ ] At least one `@smoke` test for the happy path
- [ ] Negative / validation cases under `@regression`
- [ ] Uses fixtures from `lib/fixtures` (no manual login)
- [ ] All locators live in a page object, not the spec
- [ ] All strings (URLs, messages, labels) live in `config/*` or `lib/data/constants/*`

---

## Reporting Bugs

Open an issue using the **Bug Report** template and include:

- Environment (`staging` or `production`)
- Node + Playwright versions (`node -v`, `npx playwright --version`)
- Steps to reproduce
- Expected vs actual behaviour
- Screenshots, traces, or videos if applicable

---

## Suggesting Enhancements

Use the **Feature Request** template. Describe the problem first, then the
proposed solution. Implementation details are welcome but optional.

---

## Security Issues

Please do **not** open public issues for security vulnerabilities.
See [SECURITY.md](./SECURITY.md) for the responsible disclosure process.

---

Thanks again for taking the time to contribute! 🎭
