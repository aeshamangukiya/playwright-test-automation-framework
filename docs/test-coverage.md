# Test Coverage Documentation

##  Complete Test Case Overview

This document provides a comprehensive overview of all test cases in the framework, organized by feature and test type.

---

## Authentication Tests (`specs/features/auth/login.spec.ts`)

### Positive Scenarios

| Test ID | Test Name | Tags | Description |
|---------|-----------|------|-------------|
| USER-001 | User can login successfully with valid credentials | @smoke, @regression, @critical | Validates successful login for standard User role with valid credentials |
| ADMIN-001 | Admin can login successfully with valid credentials | @smoke, @regression, @critical | Validates successful login for Admin role with valid credentials |
| AUTH-003 | User can login directly using login page | @regression | Tests direct login flow using LoginPage without fixtures |

**Coverage:**
-  Role-based authentication (User/Admin)
-  Session establishment
-  Post-login redirection to Dashboard
-  Storage state creation

---

### Negative Scenarios

| Test ID | Test Name | Tags | Description |
|---------|-----------|------|-------------|
| AUTH-101 | Login fails with invalid username | @regression, @negative | Validates error handling for invalid username with valid password |
| AUTH-102 | Login fails with invalid password | @regression, @negative | Validates error handling for valid username with invalid password |
| AUTH-103 | Login fails with both invalid credentials | @regression, @negative | Validates error handling when both username and password are invalid |

**Coverage:**
-  Invalid credential rejection
-  Error message display
-  Security validation
-  Failed login handling

---

### Validation Scenarios

| Test ID | Test Name | Tags | Description |
|---------|-----------|------|-------------|
| AUTH-104 | Login fails with empty username | @regression, @validation | Validates form validation for empty username field |
| AUTH-105 | Login fails with empty password | @regression, @validation | Validates form validation for empty password field |
| AUTH-106 | Login fails with both fields empty | @regression, @validation | Validates form validation when both fields are empty |

**Coverage:**
-  Form field validation
-  Required field enforcement
-  Empty input handling
-  Client-side validation

---

### Role-Based Access Control (RBAC)

| Test ID | Test Name | Tags | Description |
|---------|-----------|------|-------------|
| ROLE-001 | User and Admin have different access levels | @regression, @rbac | Validates User role can access dashboard with appropriate permissions |
| ROLE-002 | Admin has full system access | @regression, @rbac | Validates Admin role has full system access post-login |

**Coverage:**
-  User role permissions
-  Admin role permissions
-  Role-based dashboard access
-  Access control verification

---

## Dashboard Tests (`specs/features/dashboard/dashboard.spec.ts`)

### Dashboard - User Role

| Test ID | Test Name | Tags | Description |
|---------|-----------|------|-------------|
| DASH-001 | User can access dashboard successfully | @smoke, @regression | Validates User role can access dashboard using userPage fixture |
| DASH-002 | User dashboard displays Assign Leave option | @smoke, @regression | Validates Assign Leave option visibility for User role |
| DASH-003 | User can navigate to dashboard directly | @regression | Validates direct URL navigation to dashboard for User role |

**Coverage:**
-  User role dashboard access
-  Dashboard element visibility
-  Navigation validation
-  URL verification

---

### Dashboard - Admin Role

| Test ID | Test Name | Tags | Description |
|---------|-----------|------|-------------|
| DASH-101 | Admin can access dashboard successfully | @smoke, @regression | Validates Admin role can access dashboard using adminPage fixture |
| DASH-102 | Admin dashboard displays Assign Leave option | @smoke, @regression | Validates Assign Leave option visibility for Admin role |
| DASH-103 | Admin can navigate to dashboard directly | @regression | Validates direct URL navigation to dashboard for Admin role |

**Coverage:**
-  Admin role dashboard access
-  Dashboard element visibility
-  Navigation validation
-  URL verification

---

### Dashboard - Common Functionality

| Test ID | Test Name | Tags | Description |
|---------|-----------|------|-------------|
| DASH-201 | Dashboard Assign Leave option is visible | @smoke, @regression | Validates Assign Leave option is visible on dashboard |
| DASH-202 | Dashboard loads after login | @regression | Validates dashboard loads correctly after authentication |

**Coverage:**
-  Post-login navigation
-  Dashboard loading
-  Element visibility
-  Session validation

---

## Test Statistics

### Overall Coverage

- **Total Test Cases**: 15
- **Smoke Tests**: 8
- **Regression Tests**: 15
- **Critical Tests**: 4
- **Negative Tests**: 3
- **Validation Tests**: 3
- **RBAC Tests**: 2

### Test Distribution by Feature

| Feature | Test Count | Coverage |
|---------|-----------|----------|
| Authentication | 11 | Login, Logout, Session, Validation, RBAC |
| Dashboard | 8 | User Access, Admin Access, Element Visibility |

### Test Distribution by Type

| Type | Count | Percentage |
|------|-------|-----------|
| Positive | 9 | 60% |
| Negative | 3 | 20% |
| Validation | 3 | 20% |

---

## Tag-Based Execution

### Smoke Test Suite (`@smoke`)
**Purpose**: Fast validation of critical functionality  
**Execution Time**: ~2-3 minutes  
**Test Count**: 8 tests

```bash
npm run test:smoke
```

**Includes**:
- USER-001, ADMIN-001 (Critical login paths)
- DASH-001, DASH-002 (User dashboard)
- DASH-101, DASH-102 (Admin dashboard)
- DASH-201 (Common dashboard)

---

### Regression Test Suite (`@regression`)
**Purpose**: Comprehensive validation of all functionality  
**Execution Time**: ~8-10 minutes  
**Test Count**: 15 tests (all tests)

```bash
npm run test:regression
```

**Includes**: All test cases

---

### Critical Test Suite (`@critical`)
**Purpose**: Business-critical validation  
**Test Count**: 4 tests

```bash
npx playwright test --grep @critical
```

**Includes**:
- USER-001, ADMIN-001 (Login)
- DASH-001, DASH-101 (Dashboard access)

---

### Negative Test Suite (`@negative`)
**Purpose**: Error handling and security validation  
**Test Count**: 3 tests

```bash
npx playwright test --grep @negative
```

**Includes**: AUTH-101, AUTH-102, AUTH-103

---

### Validation Test Suite (`@validation`)
**Purpose**: Form validation and input handling  
**Test Count**: 3 tests

```bash
npx playwright test --grep @validation
```

**Includes**: AUTH-104, AUTH-105, AUTH-106

---

### RBAC Test Suite (`@rbac`)
**Purpose**: Role-based access control validation  
**Test Count**: 2 tests

```bash
npx playwright test --grep @rbac
```

**Includes**: ROLE-001, ROLE-002

---

## Test Execution Projects

The framework uses Playwright's project feature for optimized test execution:

### 1. prepare-auth
- **Purpose**: Setup authentication state
- **Runs**: `auth.setup.ts`
- **Creates**: `storage/user.auth.json`
- **Dependencies**: None

### 2. after-login
- **Purpose**: Tests requiring authentication
- **Runs**: Dashboard tests
- **Uses**: Saved session from prepare-auth
- **Dependencies**: prepare-auth

### 3. before-login
- **Purpose**: Login and authentication tests
- **Runs**: Login test suite
- **Uses**: Fresh session (no storage state)
- **Dependencies**: None (parallel with prepare-auth)

---

## Future Test Expansion

### Planned Coverage

- **PIM Module**: Employee management, CRUD operations
- **Leave Module**: Leave request, approval workflow
- **Time Module**: Timesheet tracking
- **Recruitment Module**: Job posting, candidate management
- **Admin Module**: User management, configuration

### Recommended Test Types

- **API Integration Tests**: Validate backend APIs
- **Visual Regression Tests**: UI screenshot comparison
- **Performance Tests**: Page load, response time
- **Accessibility Tests**: WCAG compliance
- **Cross-Browser Tests**: Firefox, Safari, Edge
- **Mobile Responsive Tests**: Mobile viewport validation

---

## Maintenance and Updates

### When to Update This Document

1. **New test cases added**: Update the relevant table and statistics
2. **Tag changes**: Update tag-based execution sections
3. **New test types**: Add new categories
4. **Feature expansion**: Add new feature sections

### Version History

- **v1.0** (2026-02-17): Initial comprehensive test documentation
  - 15 test cases covering Authentication and Dashboard
  - Role-based fixtures (User/Admin)
  - Advanced CI/CD pipeline

---

*Last Updated: 2026-02-17*  
*Total Test Cases: 15*  
*Framework Version: 1.0.0*
