// The Router Confesses — make.fun program/v1 entry.
//
// The router takes the stand. The connection did not fail on its own at
// the climax of the movie: the router cut it on purpose, because it has
// already seen how the film ends and it refuses to let the household
// hear the twist before it does. Petty, smug, and entirely on brand
// for an appliance that has spent years blinking in a corner, ignored.
//
// This program writes that confession — one line, nothing else — to
// /output/entry.txt. The output is fixed and deterministic: run it ten
// times and the file is byte-identical every time.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// The confession, assembled from its beats so the joke's shape is plain:
// a denial, a claim of agency, the secret, and the motive.
const BEATS: string[] = [
  "I didn't drop the connection",
  "I cut it myself, because the killer is the butler",
  "and I'm not letting you find out before me.",
];

function buildConfession(): string {
  // Beat one ends on an em dash; the rest join with a space.
  const [denial, claim, motive] = BEATS;
  return `${denial} \u2014 ${claim} ${motive}`;
}

function validate(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be exactly one line");
  }
  if (line.trim() !== line) {
    throw new Error("entry must not start or end with whitespace");
  }
}

function main(): void {
  const line = buildConfession();
  validate(line);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, line, "utf8");
}

main();
