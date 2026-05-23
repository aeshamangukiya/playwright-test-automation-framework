# Security Policy

## Supported Versions

We provide security fixes for the latest minor release on the default branch.

| Version | Supported |
| ------- | --------- |
| 1.x     | ✅        |
| < 1.0   | ❌        |

## Reporting a Vulnerability

If you discover a security vulnerability in this repository, **please do not
open a public GitHub issue**. Instead, report it privately so we can address
it before disclosure.

**Preferred channel:** [GitHub Security Advisories](https://github.com/aeshamangukiya/playwright-test-automation-framework/security/advisories/new)

Alternatively, email the maintainer at the address shown on the
[GitHub profile](https://github.com/aeshamangukiya).

Please include:

- A clear description of the vulnerability and its impact
- Steps to reproduce (commands, payloads, configuration)
- Affected commit / version
- Any suggested remediation, if known

### What to expect

- **Acknowledgement** within 3 business days
- **Initial assessment** within 7 business days
- **Fix or mitigation timeline** communicated after triage
- **Public credit** in the release notes, if you wish

## Out of Scope

The following are explicitly **not** considered vulnerabilities in this
project, since this is a test framework:

- Hard-coded demo credentials for [OrangeHRM open-source demo](https://opensource-demo.orangehrmlive.com)
- Test artefacts under `test-results/`, `playwright-report/`, `allure-results/`
- Findings that require write access to the runner host or CI configuration

## Best Practices for Users

- Never commit a real `.env` file. The `.gitignore` already excludes it — keep it that way.
- Treat staging credentials as sensitive even though demo defaults are public.
- Store production credentials only in GitHub Actions secrets (or your own secret manager).
- Rotate any credential you accidentally publish — even briefly.
