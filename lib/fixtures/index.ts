import { mergeTests } from '@playwright/test';
import { test as baseTest, expect as baseExpect } from './base.fixture';
import { test as authTest } from './auth.fixture';

/**
 * Public Fixture Entry Point
 * --------------------------
 * Specs and setup files should import from this module:
 *
 *   import { test, expect } from 'lib/fixtures';
 *
 * Internally, this merges the base fixture (page objects) and the auth
 * fixture (role-based logins) into a single `test` instance.
 */
export const test = mergeTests(baseTest, authTest);
export const expect = baseExpect;
