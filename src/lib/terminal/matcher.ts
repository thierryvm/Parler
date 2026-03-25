/**
 * Matching algorithm for Terminal Mode
 * Normalizes French spoken text and finds the best matching shell command.
 */

import { TERMINAL_DICTIONARY, type TerminalCommand } from "./dictionary.fr";

/**
 * Normalize a string: lowercase, remove accents, remove punctuation/extra spaces.
 */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .replace(/[''`]/g, " ")          // curly/straight apostrophes → space
    .replace(/[^a-z0-9\s\-_.]/g, "") // keep only safe chars
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Check if a trigger is contained in the input (substring match after normalization).
 */
function triggerMatches(normalizedInput: string, normalizedTrigger: string): boolean {
  return normalizedInput.includes(normalizedTrigger);
}

export interface MatchResult {
  command: TerminalCommand;
  /** The trigger phrase that matched */
  matchedTrigger: string;
  /** Length of matched trigger (longer = more specific = higher priority) */
  score: number;
}

/**
 * Find the best matching command for a given transcription.
 * Returns null if no trigger matches.
 *
 * Strategy: longest trigger match wins (more specific phrases take priority).
 */
export function matchCommand(rawInput: string): MatchResult | null {
  const input = normalize(rawInput);
  let best: MatchResult | null = null;

  for (const command of TERMINAL_DICTIONARY) {
    for (const trigger of command.triggers) {
      const normalizedTrigger = normalize(trigger);
      if (triggerMatches(input, normalizedTrigger)) {
        const score = normalizedTrigger.length;
        if (!best || score > best.score) {
          best = { command, matchedTrigger: trigger, score };
        }
      }
    }
  }

  return best;
}

/**
 * Returns true if the transcription looks like a terminal command intent.
 */
export function isTerminalIntent(rawInput: string): boolean {
  return matchCommand(rawInput) !== null;
}
