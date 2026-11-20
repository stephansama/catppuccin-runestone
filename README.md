<h3 align="center">
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png" width="100" alt="Logo"/><br/>
	Catppuccin for <a href="https://runestone.app">Runestone</a>
</h3>

<p align="center">
	Soothing pastel themes for the Runestone text editor on iPhone and iPad.
</p>

## Previews

Every flavor ships with all 14 Catppuccin accents. The accent tints the
interface (header buttons, search toolbar, selection); syntax colors follow
the [Catppuccin style guide](https://github.com/catppuccin/catppuccin/blob/main/docs/style-guide.md).

| Flavor | Appearance |
| --- | --- |
| 🌻 Latte | light |
| 🪴 Frappé | dark |
| 🌺 Macchiato | dark |
| 🌿 Mocha | dark |

## Usage

1. Download a zip from the [latest release](https://github.com/stephansama/catppuccin-runestone/releases/latest):
   `catppuccin-runestone-<flavor>.zip` for one flavor, or
   `catppuccin-runestone.zip` for all of them. Unzip it and pick a theme,
   e.g. `Catppuccin Mocha Mauve.runestonetheme`.
2. Get the file onto your device (AirDrop, iCloud Drive, or download it in
   Safari and save to Files).
3. Open the `.runestonetheme` file with Runestone (tap it in Files, or use
   the share sheet → Runestone), then select it in Runestone's theme settings.

## Building

Themes are generated from [`@catppuccin/palette`](https://www.npmjs.com/package/@catppuccin/palette)
by a TypeScript generator in the [`generator`](./generator) pnpm workspace
package, run with [`tsx`](https://tsx.is):

```sh
pnpm install
pnpm build       # writes ./themes (git-ignored)
pnpm package     # builds, then zips ./themes into ./dist
pnpm typecheck
```

Edit [`generator/src/build.ts`](./generator/src/build.ts) to change the color
mapping, then rebuild. The theme file schema is typed in
[`generator/src/types.ts`](./generator/src/types.ts).

### Releases

Theme files are not committed; they are build artifacts. On every push to
`main`, CI generates them and [`auto`](https://intuit.github.io/auto/) cuts a
release. Versions come from [Conventional Commits](https://www.conventionalcommits.org)
(`feat:` → minor, `fix:` / anything else → patch, `!` → major) and are
tracked with git tags. The zips from `pnpm package` are attached to each
GitHub release.

### Format notes

Runestone themes are JSON with three sections:

- `editor` — background, text, caret, gutter, page guide, selection and
  diff backgrounds. Colors are `#rrggbb` or `#rrggbbaa`.
- `interface` — header, drawer, search UI and cursor-position colors. Any
  value may also be `"system"`/`"default"` to use the iOS default.
- `scopes` — syntax highlighting rules. Runestone uses Tree-sitter, so
  `name` is a Tree-sitter capture name (`keyword`, `function.method`,
  `string.special`, …). Each rule has `color`, `fontStyle`
  (`regular`/`italic`) and `fontWeight` (`regular`/`bold`).

## 💝 Thanks to

- [Stephan Randle](https://github.com/stephansama)

&nbsp;

<p align="center">
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg" />
</p>

<p align="center">
	Copyright &copy; 2021-present <a href="https://github.com/catppuccin" target="_blank">Catppuccin Org</a>
</p>
