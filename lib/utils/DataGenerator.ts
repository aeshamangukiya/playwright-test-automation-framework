/* -------------------------------------------------------
 * DataGenerator Utility
 * -------------------------------------------------------
 * Purpose:
 * - Generate random & unique test data
 * - Enforce PW_{Entity}_{ID} pattern for traceability
 * -------------------------------------------------------
 */

import { APP_CONSTANTS } from '../data/constants/app-constants';

export class DataGenerator {
    /* ---------------------------
       Core Generators
    ---------------------------- */

    private static uniqueIdentifier(length = 6): string {
        return `${Date.now()}_${Math.random().toString(36).substring(2, 2 + length)}`;
    }

    /* ---------------------------
       Enterprise Naming Standards
       Pattern: PW_{Entity}_{UniqueIdentifier}
    ---------------------------- */

    static user(role = 'User'): string {
        return `${APP_CONSTANTS.TEST_PREFIX}_${role}_${this.uniqueIdentifier()}`;
    }

    static email(prefix = 'user', domain = 'testmail.com'): string {
        return `${APP_CONSTANTS.TEST_PREFIX}_${prefix}_${this.uniqueIdentifier()}@${domain}`;
    }

    static entityName(entityType: string): string {
        return `${APP_CONSTANTS.TEST_PREFIX}_${entityType}_${this.uniqueIdentifier()}`;
    }

    /* ---------------------------
       Helper Data
    ---------------------------- */

    static title(prefix = 'Title'): string {
        return this.entityName(prefix);
    }

    static description(prefix = 'Desc'): string {
        return `${APP_CONSTANTS.TEST_PREFIX} ${prefix} ${this.uniqueIdentifier()} - Auto-generated description`;
    }

    static sentence(): string {
        return `Auto generated text ${this.uniqueIdentifier(8)}`;
    }

    static number(length = 4): string {
        return Math.floor(
            Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
        ).toString();
    }

    static phone(): string {
        return `9${this.number(9)}`;
    }

    static date(offsetDays = 0): string {
        const date = new Date();
        date.setDate(date.getDate() + offsetDays);
        return date.toISOString().split('T')[0];
    }
}
