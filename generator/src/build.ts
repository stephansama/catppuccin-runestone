// Generates Catppuccin themes for the Runestone text editor (iOS/iPadOS).
// Usage: pnpm build
import {
  flavors,
  type AccentName,
  type CatppuccinFlavor,
  type ColorName,
} from "@catppuccin/palette";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Color, RunestoneTheme, Scope } from "./types.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = join(ROOT, "themes");

// Every Catppuccin accent colour gets its own variant.
const ACCENTS: AccentName[] = [
  "rosewater", "flamingo", "pink", "mauve", "red", "maroon", "peach",
  "yellow", "green", "teal", "sky", "sapphire", "blue", "lavender",
];

type Hex = `#${string}`;

/** Append an alpha channel (0–1) to a #rrggbb hex string. */
const alpha = (hex: Hex, a: number): Hex =>
  `${hex}${Math.round(a * 255).toString(16).padStart(2, "0")}`;

const scope = (
  name: string,
  color: Color,
  { italic = false, bold = false }: { italic?: boolean; bold?: boolean } = {},
): Scope => ({
  name,
  color,
  fontStyle: italic ? "italic" : "regular",
  fontWeight: bold ? "bold" : "regular",
});

function buildTheme(
  flavor: CatppuccinFlavor,
  accentName: AccentName,
): RunestoneTheme {
  const c = Object.fromEntries(
    Object.entries(flavor.colors).map(([k, v]) => [k, v.hex as Hex]),
  ) as Record<ColorName, Hex>;
  const accent = c[accentName];
  const dark = flavor.dark;

  // Runestone highlights with Tree-sitter, so scope names are Tree-sitter
  // capture names. Runestone falls back to the parent name (e.g.
  // "function.method" -> "function"), so more specific entries refine
  // the general ones. Mapping follows the Catppuccin style guide.
  const scopes: Scope[] = [
    scope("comment", c.overlay2, { italic: true }),
    scope("keyword", c.mauve),
    scope("keyword.operator", c.sky),
    scope("keyword.function", c.mauve),
    scope("keyword.return", c.mauve),
    scope("conditional", c.mauve),
    scope("repeat", c.mauve),
    scope("include", c.mauve),
    scope("exception", c.mauve),
    scope("storage", c.mauve),
    scope("operator", c.sky),
    scope("punctuation", c.overlay2),
    scope("punctuation.bracket", c.overlay2),
    scope("punctuation.delimiter", c.overlay2),
    scope("punctuation.special", c.sky),
    scope("delimiter", c.overlay2),
    scope("string", c.green),
    scope("string.regex", c.pink),
    scope("string.escape", c.pink),
    scope("string.special", c.pink),
    scope("escape", c.pink),
    scope("character", c.teal),
    scope("number", c.peach),
    scope("float", c.peach),
    scope("boolean", c.peach),
    scope("constant", c.peach),
    scope("constant.builtin", c.peach),
    scope("constant.macro", c.peach),
    scope("type", c.yellow),
    scope("type.builtin", c.mauve, { italic: true }),
    scope("type.definition", c.yellow),
    scope("constructor", c.sapphire),
    scope("namespace", c.yellow, { italic: true }),
    scope("module", c.yellow, { italic: true }),
    scope("function", c.blue),
    scope("function.method", c.blue),
    scope("function.call", c.blue),
    scope("function.builtin", c.peach),
    scope("function.macro", c.teal),
    scope("method", c.blue),
    scope("variable", c.text),
    scope("variable.builtin", c.red),
    scope("variable.parameter", c.maroon, { italic: true }),
    scope("parameter", c.maroon, { italic: true }),
    scope("property", c.lavender),
    scope("field", c.lavender),
    scope("label", c.sapphire),
    scope("attribute", c.yellow),
    scope("tag", c.mauve),
    scope("tag.attribute", c.teal),
    scope("tag.delimiter", c.sky),
    scope("embedded", c.text),
    // Markdown / prose
    scope("text.title", c.red, { bold: true }),
    scope("text.strong", c.red, { bold: true }),
    scope("text.strong_emphasis", c.red, { bold: true }),
    scope("text.emphasis", c.red, { italic: true }),
    scope("text.literal", c.green),
    scope("text.uri", c.rosewater),
    scope("text.link", c.lavender),
    scope("text.link_destination", c.rosewater),
    scope("text.link_label", c.lavender),
    scope("text.reference", c.lavender),
    scope("text.property", c.blue, { bold: true }),
    scope("text.quote", c.overlay2, { italic: true }),
    scope("text.list", c.teal),
    // Diffs / diagnostics
    scope("diff.plus", c.green),
    scope("diff.minus", c.red),
    scope("diff.delta", c.blue),
    scope("invalid", c.red),
    scope("error", c.red),
    scope("warning", c.yellow),
  ];

  return {
    appearance: dark ? "dark" : "light",
    editor: {
      background: c.base,
      text: c.text,
      caret: c.rosewater,
      selectedLineBackground: alpha(c.surface0, 0.6),
      invisibleCharacters: c.surface1,
      highlightedTextBackground: alpha(c.yellow, 0.3),
      insertedTextBackground: alpha(c.green, 0.2),
      removedTextBackground: alpha(c.red, 0.2),
      scrollIndicatorStyle: dark ? "white" : "black",
      gutter: {
        background: c.base,
        hairline: c.surface0,
        lineNumber: c.surface2,
        selectedLinesBackground: alpha(c.surface0, 0.6),
        selectedLinesLineNumber: c.lavender,
      },
      pageGuide: {
        background: c.mantle,
        hairline: c.surface0,
      },
    },
    interface: {
      // Only "default" has been observed for these two enums in exported
      // themes; "appearance" above drives light/dark system chrome.
      statusBarStyle: "default",
      keyboardAppearance: "default",
      leadingHairline: c.crust,
      trailingHairline: c.crust,
      header: {
        background: c.mantle,
        hairline: c.crust,
        filename: c.text,
        tint: accent,
        chevron: accent,
        unsavedChangesIndicator: accent,
        done: accent,
        language: accent,
        more: accent,
      },
      drawer: {
        background: c.mantle,
        stroke: c.crust,
        grabber: c.overlay0,
        shadow: dark ? "#00000080" : "#00000026",
        wellBackground: c.crust,
        wellHairline: c.surface0,
      },
      cursorPosition: {
        background: c.surface0,
        stroke: c.surface1,
        text: c.subtext1,
      },
      search: {
        inputs: {
          inputStroke: c.surface1,
          menu: c.overlay2,
          menuActive: accent,
          queryInputBackground: c.surface0,
          queryInputText: c.text,
          queryInputPlaceholder: c.overlay1,
          queryInputIcon: c.overlay2,
          queryInputClear: c.overlay2,
          replaceInputBackground: c.surface0,
          replaceInputText: c.text,
          replaceInputPlaceholder: c.overlay1,
          replaceInputIcon: c.overlay2,
          replaceInputClear: c.overlay2,
        },
        results: {
          topHairline: c.surface0,
          bottomHairline: c.surface0,
          lineNumber: c.overlay1,
          selection: alpha(accent, 0.3),
          emptyStateTitle: c.subtext0,
          textPreviewStroke: c.surface1,
        },
        toolbar: {
          done: accent,
          nextResult: accent,
          previousResult: accent,
          replaceAll: accent,
          resultCount: c.subtext0,
        },
      },
    },
    scopes,
  };
}

rmSync(OUT, { recursive: true, force: true });
let count = 0;
for (const [id, flavor] of Object.entries(flavors)) {
  const dir = join(OUT, id);
  mkdirSync(dir, { recursive: true });
  for (const accentName of ACCENTS) {
    const accent = flavor.colors[accentName].name;
    const file = join(dir, `Catppuccin ${flavor.name} ${accent}.runestonetheme`);
    writeFileSync(file, JSON.stringify(buildTheme(flavor, accentName), null, 2) + "\n");
    count++;
  }
}
console.log(`Generated ${count} themes in ./${relative(ROOT, OUT)}`);
