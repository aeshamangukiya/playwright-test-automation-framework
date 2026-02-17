/* -------------------------------------------------------
 * Logger Utility
 * -------------------------------------------------------
 * Purpose:
 * - Centralized logging for tests, pages, fixtures, utils
 * - Clear log levels for debugging & CI visibility
 * - No external dependencies
 * -------------------------------------------------------
 */

export class Logger {
    /* ---------------------------
       Core Helpers
    ---------------------------- */

    private static timestamp(): string {
        return new Date().toISOString();
    }

    private static format(level: string, message: string): string {
        return `[${this.timestamp()}] [${level}] ${message}`;
    }

    /* ---------------------------
       Log Levels
    ---------------------------- */

    /**
     * General informational logs
     * Use for normal test flow steps
     */
    static info(message: string): void {
        console.log(this.format('INFO', message));
    }

    /**
     * Debug-level logs
     * Use for local debugging or detailed tracing
     * (can be disabled in CI)
     */
    static debug(message: string): void {
        if (process.env.DEBUG === 'true') {
            console.debug(this.format('DEBUG', message));
        }
    }

    /**
     * Warning logs
     * Use when something is unexpected but not test-breaking
     */
    static warn(message: string): void {
        console.warn(this.format('WARN', message));
    }

    /**
     * Error logs
     * Use when test failures or exceptions occur
     */
    static error(message: string, error?: unknown): void {
        console.error(this.format('ERROR', message));

        if (error instanceof Error) {
            console.error(error.stack);
        }
    }

    /**
     * Success logs
     * Use for major success checkpoints (login success, setup done)
     */
    static success(message: string): void {
        console.log(this.format('SUCCESS', message));
    }

    /* ---------------------------
       Test-Specific Helpers
    ---------------------------- */

    /**
     * Log test step execution
     * Example: "Login as User"
     */
    static step(message: string): void {
        console.log(this.format('STEP', message));
    }

    /**
     * Log assertions
     */
    static assertion(message: string): void {
        console.log(this.format('ASSERT', message));
    }

    /**
     * Log API or network-related info
     */
    static api(message: string): void {
        console.log(this.format('API', message));
    }

    /**
     * Log navigation events
     */
    static navigation(message: string): void {
        console.log(this.format('NAV', message));
    }
}
