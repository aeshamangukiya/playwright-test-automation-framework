/**
 * Enterprise Environment Configuration Loader
 * --------------------------------------------
 * - Loads `.env` once and centralizes all environment-specific values.
 * - Performs strict validation and fails fast if a required variable is missing.
 * - Supports dynamic environment switching (`staging`, `production`) without code changes.
 * - Provides both flat and nested access patterns for ergonomic use across the framework.
 *
 * Any code that needs an environment value must import from this module — never
 * read from `process.env` directly elsewhere in the project.
 */

import * as dotenv from 'dotenv';

dotenv.config();

const VALID_ENVIRONMENTS = ['staging', 'production'] as const;
type EnvironmentType = (typeof VALID_ENVIRONMENTS)[number];

const ENVIRONMENT = (process.env.ENVIRONMENT ?? '').toLowerCase();

if (!ENVIRONMENT) {
    throw new Error(
        '❌ ENVIRONMENT variable is missing in .env file. ' +
        `Expected one of: ${VALID_ENVIRONMENTS.join(', ')}`,
    );
}

if (!VALID_ENVIRONMENTS.includes(ENVIRONMENT as EnvironmentType)) {
    throw new Error(
        `❌ Invalid ENVIRONMENT: "${ENVIRONMENT}". ` +
        `Expected one of: ${VALID_ENVIRONMENTS.join(', ')}`,
    );
}

/**
 * Reads a required variable for the active environment.
 * Automatically resolves the prefix (e.g., `STAGING_` or `PRODUCTION_`).
 */
function getRequiredVar(key: string): string {
    const fullKey = `${ENVIRONMENT.toUpperCase()}_${key}`;
    const value = process.env[fullKey];

    if (!value) {
        throw new Error(`❌ Missing required environment variable: ${fullKey}`);
    }

    return value;
}

/** Reads an optional, non-required env flag. */
function getBoolFlag(key: string, defaultValue = false): boolean {
    const value = process.env[key];
    if (!value) return defaultValue;
    return value.toLowerCase() === 'true';
}

const BASE_URL = getRequiredVar('BASE_URL');
const USER_USERNAME = getRequiredVar('USER_USERNAME');
const USER_PASSWORD = getRequiredVar('USER_PASSWORD');
const ADMIN_USERNAME = getRequiredVar('ADMIN_USERNAME');
const ADMIN_PASSWORD = getRequiredVar('ADMIN_PASSWORD');

export const ENV = {
    CURRENT: ENVIRONMENT as EnvironmentType,
    BASE_URL,

    // Flat access
    USER_USERNAME,
    USER_PASSWORD,
    ADMIN_USERNAME,
    ADMIN_PASSWORD,

    // Runtime flags
    IS_CI: getBoolFlag('CI') || getBoolFlag('GITHUB_ACTIONS'),
    DEBUG: getBoolFlag('DEBUG'),

    // Nested access (backward compatible)
    USERS: {
        USER: { username: USER_USERNAME, password: USER_PASSWORD },
        ADMIN: { username: ADMIN_USERNAME, password: ADMIN_PASSWORD },
    },
} as const;

export const CURRENT_ENVIRONMENT = ENV.CURRENT;
