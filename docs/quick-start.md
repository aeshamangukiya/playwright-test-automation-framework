# 🚀 Quick Start Guide

## Getting Started in 5 Minutes

This quick start guide will help you get the Playwright Test Automation Framework up and running in minutes.

---

## Prerequisites Checklist

Before you begin, ensure you have:

- ✅ **Node.js 18+** - [Download](https://nodejs.org/)
- ✅ **npm 9+** - Comes with Node.js
- ✅ **Git** - [Download](https://git-scm.com/)
- ✅ **Chrome browser** - [Download](https://www.google.com/chrome/)

---

## Step-by-Step Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/playwright-test-automation-framework.git
cd playwright-test-automation-framework
```

### 2️⃣ Install Dependencies

```bash
# Install Node modules
npm install

# Install Playwright browsers
npx playwright install chromium
```

**Expected time**: ~2-3 minutes

---

### 3️⃣ Configure Environment

The project ships with a working `.env` file for the OrangeHRM demo. No changes needed!

**Optional**: To customize, copy `.env.example` to `.env`:

```bash
# On Windows
copy .env.example .env

# On Linux/Mac
cp .env.example .env
```

The default configuration:
```env
ENVIRONMENT=staging
STAGING_BASE_URL=https://opensource-demo.orangehrmlive.com
STAGING_USER_USERNAME=Admin
STAGING_USER_PASSWORD=admin123
STAGING_ADMIN_USERNAME=Admin
STAGING_ADMIN_PASSWORD=admin123
```

---

### 4️⃣ Run Your First Test

#### Option A: Quick Smoke Test (Recommended)

```bash
npm run test:smoke
```

**What it does**:
- Runs 8 critical tests
- Takes ~2-3 minutes
- Validates core authentication and dashboard functionality

#### Option B: Full Test Suite

```bash
npm test
```

**What it does**:
- Runs all 20 tests (15 tests + 5 setup tests)
- Takes ~8-10 minutes
- Comprehensive coverage

#### Option C: Watch Tests in UI Mode

```bash
npx playwright test --ui
```

**What it does**:
- Opens interactive Playwright UI
- Watch tests execute step-by-step
- Great for learning and debugging

---

### 5️⃣ View Test Results

After tests complete, view the reports:

#### Playwright HTML Report

```bash
npx playwright show-report
```

#### Allure Report

```bash
npm run allure:report
```

---

## 🎯 Common Test Commands

### Run Specific Test Suites

```bash
# Critical tests only
npx playwright test --grep @critical

# All regression tests
npm run test:regression

# Negative test scenarios
npx playwright test --grep @negative

# Validation tests
npx playwright test --grep @validation

# RBAC tests
npx playwright test --grep @rbac
```

### Run Specific Test Files

```bash
# Login tests only
npx playwright test specs/features/auth/login.spec.ts

# Dashboard tests only
npx playwright test specs/features/dashboard/dashboard.spec.ts  
```

### Run in Different Modes

```bash
# Headed mode (see the browser)
npm run test:headed

# Debug mode (step through tests)
npx playwright test --debug

# Specific browser
npx playwright test --project=chromium
```

---

## 📊 Understanding Test Output

### Console Logs

Tests use a custom Logger with colored output:

```
[2026-02-17T12:42:20.841Z] [STEP] Step 1: Navigate to login page
[2026-02-17T12:42:25.632Z] [STEP] Step 2: Attempt login with invalid username
[2026-02-17T12:42:28.684Z] [STEP] Step 3: Verify error message is displayed
[2026-02-17T12:42:28.841Z] [SUCCESS] ✅ Invalid username correctly rejected
```

### Test Results

```
Passed:  15 tests (including 5 setup tests)
Failed:  0 tests
Skipped: 0 tests
```

---

## 🔧 Troubleshooting

### Issue: Tests fail with "browser not found"

**Solution**:
```bash
npx playwright install chromium --with-deps
```

### Issue: Tests timeout

**Solution**: Check your internet connection. The demo site requires internet access.

### Issue: `.env` file not found

**Solution**:
```bash
copy .env.example .env
```

### Issue: Port already in use (for UI mode)

**Solution**: Close any existing Playwright UI sessions or use a different port

---

## 📁 Project Structure Quick Reference

```
playwright-test-automation-framework/
├── specs/                      # Test files
│   ├── features/
│   │   ├── auth/              # Login tests
│   │   └── dashboard/         # Dashboard tests
│   └── setup/                 # Authentication setup
│
├── lib/                       # Framework code
│   ├── pages/                 # Page Objects
│   ├── fixtures/              # Test fixtures
│   ├── data/                  # Test data & constants
│   ├── helpers/               # Assertion helpers
│   └── utils/                 # Utilities (Logger, Wait)
│
├── config/                    # Configuration
│   ├── env.ts                 # Environment config
│   ├── browser.ts             # Browser settings
│   └── urls.ts                # Application URLs
│
├── docs/                      # Documentation
├── .github/workflows/         # CI/CD pipelines
└── playwright.config.ts       # Playwright config
```

---

## 🎓 Next Steps

Now that you're up and running:

1. **Explore Test Files**: Look at `specs/features/auth/login.spec.ts` to understand test structure
2. **Read Documentation**: 
   - [Architecture docs](docs/architecture.md)
   - [Test Coverage](docs/test-coverage.md)
3. **Run in CI**: Push to GitHub to trigger the CI/CD pipeline
4. **Customize**: Add your own tests and page objects
5. **Read the README**: Full documentation in [README.md](../README.md)

---

## 💡 Quick Tips

- **Run tests often**: Use `npm run test:smoke` for quick feedback
- **Use UI mode**: Great for development with `npx playwright test --ui`
- **Check logs**: Tests have detailed logging for debugging
- **Use fixtures**: Leverage `loginAs()`, `userPage`, and `adminPage` fixtures
- **Tag appropriately**: Use `@smoke`, `@regression`, `@critical` tags

---

## 🆘 Get Help

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/playwright-test-automation-framework/issues)
- **Playwright Docs**: [playwright.dev](https://playwright.dev)
- **OrangeHRM Demo**: [opensource-demo.orangehrmlive.com](https://opensource-demo.orangehrmlive.com)

---

**Happy Testing! 🎭**
