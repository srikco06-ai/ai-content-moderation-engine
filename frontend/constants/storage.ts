/**
 * Application-wide localStorage constants.
 *
 * This file centralizes all storage-related keys and limits so they
 * remain consistent across the frontend.
 */

/**
 * Namespaced localStorage keys.
 */
export const STORAGE_KEYS = Object.freeze({
  HISTORY: "ai-content-moderation-history",
} as const);

/**
 * Backward-compatible alias.
 *
 * Some existing files still import `STORAGE_KEY` instead of
 * `STORAGE_KEYS.HISTORY`. Keeping this alias prevents build errors
 * while allowing the codebase to migrate gradually.
 */
export const STORAGE_KEY = STORAGE_KEYS.HISTORY;

/**
 * Maximum number of moderation history records
 * stored in the browser.
 */
export const MAX_HISTORY_ITEMS = 20;