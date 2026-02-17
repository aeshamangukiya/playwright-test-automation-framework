import * as dotenv from 'dotenv';
dotenv.config();

type EnvironmentType = 'staging' | 'production';

const CURRENT_ENV = (process.env.ENVIRONMENT as EnvironmentType) || 'production';

const ENV_CONFIG = {
    staging: {
        BASE_URL: process.env.STAGING_BASE_URL!,
        USERS: {
            USER: {
                username: process.env.STAGING_USER_USERNAME!,
                password: process.env.STAGING_USER_PASSWORD!
            },
            ADMIN: {
                username: process.env.STAGING_ADMIN_USERNAME!,
                password: process.env.STAGING_ADMIN_PASSWORD!
            }
        }
    },

    production: {
        BASE_URL: process.env.PRODUCTION_BASE_URL!,
        USERS: {
            USER: {
                username: process.env.PRODUCTION_USER_USERNAME!,
                password: process.env.PRODUCTION_USER_PASSWORD!
            },
            ADMIN: {
                username: process.env.PRODUCTION_ADMIN_USERNAME!,
                password: process.env.PRODUCTION_ADMIN_PASSWORD!
            }
        }
    }
};

export const ENV = ENV_CONFIG[CURRENT_ENV];
