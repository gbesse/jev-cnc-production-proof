import type { Dossier, Document } from "./index.mjs";
export function importExpenseBundle(
  bundle: {
    expenses: Record<string, unknown>[];
    posts: Record<string, unknown>[];
    from: string;
    to: string;
  },
  options?: { at?: string },
): Dossier;
