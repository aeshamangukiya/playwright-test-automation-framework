/* -------------------------------------------------------
 * DataGenerator Utility
 * -------------------------------------------------------
 * Purpose:
 * - Generate random & unique test data
 * - Avoid hard-coded values
 * -------------------------------------------------------
 */

export class DataGenerator {
  /* ---------------------------
     Basic Helpers
  ---------------------------- */

  private static randomNumber(length = 4): string {
    return Math.floor(
      Math.pow(10, length - 1) +
        Math.random() * 9 * Math.pow(10, length - 1)
    ).toString();
  }

  private static randomString(length = 6): string {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  }

  /* ---------------------------
     Names & Titles
  ---------------------------- */

  static groupName(prefix = 'Test Group'): string {
    return `${prefix} ${Date.now()}`;
  }

  static userName(prefix = 'User'): string {
    return `${prefix}_${this.randomString(5)}`;
  }

  static title(prefix = 'Title'): string {
    return `${prefix} ${this.randomString(4)}`;
  }

  /* ---------------------------
     Text / Descriptions
  ---------------------------- */

  static description(prefix = 'Test description'): string {
    return `${prefix} ${this.randomString(10)}`;
  }

  static sentence(): string {
    return `Auto generated text ${this.randomString(12)}`;
  }

  /* ---------------------------
     Numbers
  ---------------------------- */

  static number(length = 4): string {
    return this.randomNumber(length);
  }

  static phone(): string {
    return `9${this.randomNumber(9)}`;
  }

  /* ---------------------------
     Emails
  ---------------------------- */

  static email(domain = 'testmail.com'): string {
    return `user_${this.randomString(6)}@${domain}`;
  }

  /* ---------------------------
     Date & Time
  ---------------------------- */

  static today(): string {
    return new Date().toISOString().split('T')[0];
  }

  static futureDate(days = 7): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  /* ---------------------------
     Identifiers
  ---------------------------- */

  static uniqueId(prefix = 'ID'): string {
    return `${prefix}_${Date.now()}_${this.randomString(4)}`;
  }
}
